import {HttpClient} from '@angular/common/http'
import {APIRequestOptions, APIResponse} from '../interfaces'
import {ApiConfig} from '../config'
import {APIRequestResources} from "../enums"

export abstract class APIRequest {
  protected constructor(protected http: HttpClient, protected resource: APIRequestResources) {}

  public get<T>(options: APIRequestOptions) {
    return this.http.get<APIResponse<T>>(this.generateUrl(options), { params: options.params, headers: options.headers || {} })
  }
  public getBlob(options: APIRequestOptions, jsperKey: string) {
    const headers = { jspAuthKey: jsperKey, ...options.headers };
    return this.http.get(this.generateUrl(options), {
      headers,
      responseType: 'blob'
    });
  }

  public delete<T>(options: APIRequestOptions) {
    return this.http.delete<APIResponse<T>>(this.generateUrl(options), { body: options.params, headers: options.headers })
  }

  public post<T>(data: unknown, options: APIRequestOptions) {
    return this.http.post<APIResponse<T>>(this.generateUrl(options), data, { params: options.params, headers: options.headers })
  }

  public put<T>(data: unknown, options: APIRequestOptions) {
    return this.http.put<APIResponse<T>>(this.generateUrl(options), data, { params: options.params, headers: options.headers })
  }

  public patch<T>(data: unknown, options: APIRequestOptions) {
    return this.http.patch<APIResponse<T>>(this.generateUrl(options), data, { params: options.params, headers: options.headers })
  }

  private generateUrl({ id, resource, endpoint, suffix }: APIRequestOptions) {
    return [ApiConfig.baseURL, resource ?? this.resource, id, endpoint, suffix].filter(x => !!x).join('/').split('://').map(p => p.replace(/\/\//, '/')).join('://')
  }

}
