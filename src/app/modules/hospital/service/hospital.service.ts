import {APIRequestResources, CachedAPIRequest} from "../../../core";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {Hospital, HospitalDTO} from "../interface/hospital.entity";
import {handleError} from "../../../core/utils/utils";


@Injectable({
    providedIn: 'root'
})
export class HospitalService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<HospitalDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<Hospital | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.HospitalService)
        this.getAll().pipe(take(1)).subscribe()
    }


    getAll(refresh = true) {
        return this.get<HospitalDTO[]>({}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap(res => this.$all.next(res.data ?? [])),
                catchError(handleError)
            )
    }


    getById = (id: string, refresh= true) => {
        return this.get<Hospital>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial(){
        this.$active.next(undefined)
    }


    update = (id: number, hospitalDetails: any) => {
        const options = {suffix: id.toString()};
        return this.put<any>(hospitalDetails, options).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

    create = (hospital: any) => {
        return this.post<any>(hospital, {}).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

}
