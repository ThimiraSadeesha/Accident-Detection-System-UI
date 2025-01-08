import {APIRequestResource} from "../types"

export interface APIRequestOptions {
  /**
   * ID
   *
   * @type string | undefined
   * @description This will be included at the end of the URL
   */
  id?: string,

  /**
   * Resource
   *
   * @type APIRequestResource | undefined
   * @description This is the resource name of your microservice
   */
  resource?: APIRequestResource

  /**
   * Endpoint
   *
   * @type string | undefined
   * @description This is the endpoint you're calling
   */
  endpoint?: string

  /**
   * Suffix
   *
   * @type string
   * @description This will be added to the very end of the URL tree
   */
  suffix?: string

  /**
   * Parameters
   *
   * @type Record<string, string | string[] | number | boolean>
   * @description Use this to enter your parameters of the request
   */
  params?: Record<string, string | string[] | number | boolean>

  /**
   * Headers
   *
   * @type Record<string, string>
   * @description Use this to include any headers you want to send with the request
   */
  headers?: Record<string, string>,
}


export interface PaginationResponse<T> {
  page: number
  itemsPerPage: number
  totalItems: number
  data: T
}

export interface CachedAPIMap {
  timestamp: Date
  value: APIResponse<unknown>
}

export interface APIResponse<T> {
  data: T,
  // Other properties if any
}
