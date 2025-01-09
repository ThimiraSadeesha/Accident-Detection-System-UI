import {APIRequestResources, CachedAPIRequest, LoadingService, PaginationResponse} from "../../../core";
import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, finalize, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {Hospital, HospitalDTO} from "../interface/hospital.entity";
import {handleError} from "../../../core/utils/utils";
import {FireFind} from "../../fire/interface/fire.entity";


@Injectable({
    providedIn: 'root'
})
export class HospitalService extends CachedAPIRequest {

    loading = inject(LoadingService);

    private readonly $all = new BehaviorSubject<HospitalDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<Hospital | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.HospitalService)
        this.find({
            code: '',
            name: '',
            items_per_page: 10,
            page_number: 1,
        }, true).pipe(take(1)).subscribe()
    }


    find = (searchParams: any, refresh = true) => {
        this.loading.set(true, {immediate: true});
        return this.get<PaginationResponse<HospitalDTO[]>>(
            {endpoint: `find`, params: searchParams,},
            refresh ? 'freshness' : 'performance'
        ).pipe(
            tap((res) => {
                this.$all.next(res.data.data);
            }),
            tap((res) => {
                const {data, ...obj} = res.data;
                this.$statistics.next(obj);
            }),
            finalize(() => {
                this.loading.set(false);
            })
        );
    };


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
