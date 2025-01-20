import {Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest} from "../../../core";
import {BehaviorSubject, catchError, take, tap} from "rxjs";
import {Employee} from "../interface/employee.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {handleError} from "../../../core/utils/utils";
import {DeviceDTO} from "../interface/device.entity";


@Injectable({
    providedIn: 'root'
})
export class DeviceService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<DeviceDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.DeviceService)
        this.getAll().pipe(take(1)).subscribe()
    }

    getAll(refresh = false) {
        return this.get<DeviceDTO[]>({}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap(res => this.$all.next(res.data ?? [])),
                catchError(handleError)
            )
    }


}