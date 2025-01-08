import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErpApiRequest, ERPRequestResources, PaginationResponse} from "../../../core";
import {BehaviorSubject, tap} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {PurchaseOrderData, PurchaseOrderSearch} from "../interface/purchase-order.entity";


@Injectable({
    providedIn: 'root'
})
export class ERP_PO_Service extends ErpApiRequest {

    $erpAll = new BehaviorSubject<PurchaseOrderSearch[]>([]);
    erpAll = toSignal(this.$erpAll, {initialValue: []});


    $active = new BehaviorSubject<PurchaseOrderData | undefined>(undefined);
    active = toSignal(this.$active, {initialValue: undefined});

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, ERPRequestResources.PurchaseOrderService)
        this.find({po_number:'PO202010',items_per_page:10,page_number:1},true).pipe(take(1)).subscribe()
    }

    find = (searchParams: any, refresh = false) => {
        return this.get<PaginationResponse<PurchaseOrderSearch[]>>({
            endpoint: `find`,
            params: searchParams,
        }, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$erpAll.next(res.data.data))
            )
    }

    getById = (id: string, refresh = false) => {
        return this.get<PurchaseOrderData>({id}, refresh ? 'freshness' : 'performance')
            .pipe(tap((res) => this.$active.next(res.data)),);
    }


}
