import {APIRequestResources} from "../enums"

export type APIRequestResource =
    APIRequestResources.AuthService |
    APIRequestResources.EmployeeService |
    APIRequestResources.HospitalService |
    APIRequestResources.UserService |
    APIRequestResources.FireService |
    APIRequestResources.PoliceService |
    APIRequestResources.DeviceService |
    APIRequestResources.ChartService


export type APIRequestMethod = 'delete' | 'get' | 'post' | 'put'

export type APIRequestCacheStrategy = 'performance' | 'freshness'

