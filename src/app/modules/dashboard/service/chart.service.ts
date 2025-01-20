import {inject, Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest, LoadingService, PaginationResponse} from "../../../core";
import {BehaviorSubject, finalize, interval, switchMap, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IncidentChartDTO, NotificationDTO} from "../interface/chat.entity";
import {take} from "rxjs/operators";
import {FireFind} from "../../fire/interface/fire.entity";
import {IncidentReportDto} from "../../reports/interface/sri-lanka-regions";

@Injectable({
    providedIn: 'root'
})
export class ChartService extends CachedAPIRequest {

    loading = inject(LoadingService)

    private readonly $all = new BehaviorSubject<IncidentReportDto[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<IncidentChartDTO | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $notification = new BehaviorSubject<NotificationDTO | undefined>(undefined)
    notification = toSignal(this.$notification, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.ChartService)
        this.getDetails(true).pipe(take(1)).subscribe()
    }


    reportGenerate = (searchParams: any, refresh = true) => {
        this.loading.set(true, {immediate: true});
        return this.get<IncidentReportDto[]>(
            {endpoint: `find`, params: searchParams,},
            refresh ? 'freshness' : 'performance'
        ).pipe(
            tap((res) => {
                this.$all.next(res.data);
            }),
            finalize(() => {
                this.loading.set(false);
            })
        );
    };

    getNotification = (refresh = true) => {
        return this.get<NotificationDTO>({endpoint: 'latest'}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$notification.next(res.data)),
            )
    }



    getDetails = (refresh = true) => {
        return this.get<IncidentChartDTO>({endpoint: 'chart'}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }


}