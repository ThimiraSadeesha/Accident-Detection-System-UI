import {inject, Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest, LoadingService} from "../../../core";
import {BehaviorSubject, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {IncidentChartDTO} from "../interface/chat.entity";
import {take} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChartService extends CachedAPIRequest {

    loading = inject(LoadingService)

    private readonly $active = new BehaviorSubject<IncidentChartDTO | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.ChartService)
        this.getDetails(true).pipe(take(1)).subscribe()
    }

    getDetails = ( refresh = true) => {
        return this.get<IncidentChartDTO>({endpoint:'chart'}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }


}