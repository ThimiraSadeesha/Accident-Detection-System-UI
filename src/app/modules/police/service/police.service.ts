// import {Injectable} from "@angular/core";
// import {APIRequestResources, CachedAPIRequest} from "../../core";
// import {BehaviorSubject, catchError, take, tap} from "rxjs";
// import {JobCardSearchResultDTO} from "../interface/plan-card.entity";
// import {toSignal} from "@angular/core/rxjs-interop";
// import {JobCardResultDTO} from "../interface/job-card.entity";
// import {HttpClient} from "@angular/common/http";
// import {Router} from "@angular/router";
// import {UserDTO} from "../interface/user.entity";
// import {UnitDTO} from "../interface/unit.entity";
// import {handleError} from "../../core/util/util";
// import {PoliceStation, PoliceStationDTO} from "../interface/police.entity";
// import {Hospital} from "../interface/hospital.entity";
//
//
// @Injectable({
//     providedIn: 'root'
// })
// export class PoliceService extends CachedAPIRequest {
//
//     private readonly $all = new BehaviorSubject<PoliceStationDTO[]>([])
//     all = toSignal(this.$all, {initialValue: []})
//
//     private readonly $active = new BehaviorSubject<PoliceStation | undefined>(undefined)
//     active = toSignal(this.$active, {initialValue: undefined})
//
//     private readonly $statistics = new BehaviorSubject<any>(undefined)
//     stat = toSignal(this.$statistics, {initialValue: undefined})
//
//     constructor(protected override http: HttpClient, private router: Router) {
//         super(http, APIRequestResources.PoliceService)
//         this.getAll().pipe(take(1)).subscribe()
//     }
//
//     getAll(refresh = true) {
//         return this.get<PoliceStationDTO[]>({}, refresh ? 'freshness' : 'performance')
//             .pipe(
//                 tap(res => this.$all.next(res.data ?? [])),
//                 catchError(handleError)
//             )
//     }
//
//
//     getById = (id: string, refresh= true) => {
//         return this.get<PoliceStation>({id}, refresh ? 'freshness' : 'performance')
//             .pipe(
//                 tap((res) => this.$active.next(res.data)),
//             )
//     }
//
//     initial(){
//         this.$active.next(undefined)
//     }
//
//
//     update = (id: number, policedetails: any) => {
//         const options = {suffix: id.toString()};
//         return this.put<any>(policedetails, options).pipe(
//             tap(() => {
//                 this.$all.next([])
//             })
//         );
//     }
//
//     create = (police: any) => {
//         return this.post<any>(police, {}).pipe(
//             tap(() => {
//                 this.$all.next([])
//             })
//         );
//     }
//
//
//
// }
