import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, take, tap} from "rxjs";
import {Employee, UserDTO} from "../interface/employee.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {APIRequestResources, CachedAPIRequest} from "../../../core";
import {handleError} from "../../../core/utils/utils";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CachedAPIRequest {

  private readonly $all = new BehaviorSubject<UserDTO[]>([])
  all = toSignal(this.$all, {initialValue: []})

  constructor(protected override http: HttpClient, private router: Router) {
    super(http, APIRequestResources.EmployeeService)
    this.getAll().pipe(take(1)).subscribe()
  }

  getAll(refresh = false) {
    return this.get<UserDTO[]>({}, refresh ? 'freshness' : 'performance')
      .pipe(
        tap(res => this.$all.next(res.data ?? [])),
        catchError(handleError)
      )
  }


}
