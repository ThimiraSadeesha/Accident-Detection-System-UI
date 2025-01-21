import {inject, Injectable, signal} from "@angular/core";
import {APIRequestResources, CachedAPIRequest, LoadingService, PaginationResponse} from "../../../core";
import {BehaviorSubject, finalize, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {IncidentGetBYDTO, IncidentViewDTO} from "../interface/accident.entity";


@Injectable({
    providedIn: 'root'
})
export class AccidentService extends CachedAPIRequest {
    loading = inject(LoadingService);
    createModal = signal(false)


    private readonly $all = new BehaviorSubject<IncidentViewDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<IncidentGetBYDTO | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.AccidentService)
        this.find({
            user_name: '',
            nic: '',
            contact_number: '',
            city: '',
            district: '',
            province: '',
            vehicle_number: '',
            device_id: '',
            severity: '',
            incident_status: '',
            items_per_page: 10,
            page_number: 1,
        }, true).pipe(take(1)).subscribe()
    }


    find = (searchParams: any, refresh = true) => {
        this.loading.set(true, {immediate: true});
        return this.get<PaginationResponse<IncidentViewDTO[]>>(
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
        return this.get<IncidentGetBYDTO>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial = () => {
        this.$active.next(undefined)
    }
}