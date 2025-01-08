import {HttpClient} from "@angular/common/http"
import {catchError, of, tap} from "rxjs"
import {APIRequestOptions, APIResponse, CachedAPIMap} from "../interfaces"
import {APIRequestCacheStrategy, APIRequestMethod, APIRequestResource} from "../types"
import {ttlToMilliseconds} from "../utils"
import {APIRequest} from "./api.request.class"
import {environment} from "../../../environments/environment.development";





export abstract class CachedAPIRequest extends APIRequest {

  private cache = new Map<string, CachedAPIMap>()
  private ttl: number

  constructor(protected override http: HttpClient, protected override resource: APIRequestResource) {
    super(http, resource)

    this.ttl = ttlToMilliseconds(environment.cache?.maxAge ?? '1h')
  }

  public override get<T>(options: APIRequestOptions, strategy: APIRequestCacheStrategy = 'performance') {

    if (strategy === 'performance') {
      const cachedResponse = this.getFromCache('get', options)
      if (cachedResponse) return of<APIResponse<T>>(cachedResponse.value as APIResponse<T>)
    }

    return super.get<T>(options).pipe(tap(res => {
      this.saveToCache('get', options, res)
    }), catchError(err => {
      if (strategy === 'freshness') {
        const cachedResponse = this.getFromCache('get', options)
        if (cachedResponse) return of<APIResponse<T>>(cachedResponse.value as APIResponse<T>)
      }

      throw new Error(err)
    }))
  }

  private generateCacheKey(method: APIRequestMethod, options: APIRequestOptions) {
    const optionsStr = JSON.stringify(options)
    return `${this.resource}|${method}|${optionsStr}`
  }

  private saveToCache(method: APIRequestMethod, options: APIRequestOptions, data: APIResponse<unknown>) {
    this.cache.set(this.generateCacheKey(method, options), {
      timestamp: new Date(),
      value: data
    })

    this.cleanCache()
  }

  private cleanCache() {
    for (const key of this.cache.keys()) {
      if (Date.now() - (this.cache.get(key)?.timestamp.getTime() ?? 0) >= this.ttl) {
        console.log(`Cache Removed (Expired): ${key}`, this.cache.get(key))
        this.cache.delete(key)
      }
    }

    if (this.cache.size > (environment.cache?.maxSize ?? 5000)) {
      const key = Array.from(this.cache.keys()).pop()
      if (key) {
        console.log(`Cache Removed (Limit Exceeded): ${key}`, this.cache.get(key))
        this.cache.delete(key)
      }

    }
  }

  private getFromCache(method: APIRequestMethod, options: APIRequestOptions) {
    this.cleanCache()
    return this.cache.get(this.generateCacheKey(method, options))
  }
}
