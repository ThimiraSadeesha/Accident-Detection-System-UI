import {APIRequestResources, CachedAPIRequest, LoadingService, PaginationResponse} from "../../../core";
import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, finalize, tap} from "rxjs";
import {Fire, FireDTO, FireFind} from "../interface/fire.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {handleError} from "../../../core/utils/utils";
import {PoliceFind} from "../../police/interface/police.entity";


@Injectable({
    providedIn: 'root'
})
export class FireService extends CachedAPIRequest {

    loading = inject(LoadingService);

    private readonly $all = new BehaviorSubject<FireFind[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<Fire | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.FireService)
        this.find({
            code: '',
            name: '',
            items_per_page: 10,
            page_number: 1,
        }, true).pipe(take(1)).subscribe()
    }

    find = (searchParams: any, refresh = true) => {
        this.loading.set(true, {immediate: true});
        return this.get<PaginationResponse<FireFind[]>>(
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

    getById = (id: string, refresh = true) => {
        return this.get<Fire>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial() {
        this.$active.next(undefined)
    }

    update = (id: number, fireDetails: any) => {
        const options = {suffix: id.toString()};
        return this.put<any>(fireDetails, options).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

    create = (fireDetails: any) => {
        return this.post<any>(fireDetails, {}).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

}
