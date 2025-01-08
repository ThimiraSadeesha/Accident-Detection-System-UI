import {APIRequestResources, ERPRequestResources} from "../enums"

export type APIRequestResource =
    APIRequestResources.AuthService
    // APIRequestResources.AuthService |



export type APIRequestMethod = 'delete' | 'get' | 'post' | 'put'

export type APIRequestCacheStrategy = 'performance' | 'freshness'

