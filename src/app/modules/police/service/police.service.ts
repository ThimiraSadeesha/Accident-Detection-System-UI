import {BehaviorSubject, catchError, finalize, tap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest, LoadingService, PaginationResponse} from "../../../core";
import {PoliceFind, PoliceStation, PoliceStationDTO} from "../interface/police.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {handleError} from "../../../core/utils/utils";


@Injectable({
    providedIn: 'root'
})
export class PoliceService extends CachedAPIRequest {
    loading = inject(LoadingService);

    private readonly $all = new BehaviorSubject<PoliceFind[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<PoliceStation | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.PoliceService)
        this.find({
            code:'',
            name:'',
            items_per_page:10,
            page_number:1,
        }, true).pipe(take(1)).subscribe()
    }


    find = (searchParams: any, refresh = true) => {
        this.loading.set(true, {immediate: true});
        return this.get<PaginationResponse<PoliceFind[]>>(
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


    // getAll(refresh = true) {
    //     return this.get<PoliceStationDTO[]>({}, refresh ? 'freshness' : 'performance')
    //         .pipe(
    //             tap(res => this.$all.next(res.data ?? [])),
    //             catchError(handleError)
    //         )
    // }


    getById = (id: string, refresh = true) => {
        return this.get<PoliceStation>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial() {
        this.$active.next(undefined)
    }


    update = (id: number, policedetails: any) => {
        const options = {suffix: id.toString()};
        return this.put<any>(policedetails, options).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

    create = (police: any) => {
        return this.post<any>(police, {}).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }


}
