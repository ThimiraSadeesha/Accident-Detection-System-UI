import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    $$POFetchModal = signal(false);
    $$POUpdateModal = signal(false);
    $$ShipmentCreateModal = signal(false);
    $$ShipmentUpdateModal = signal(false);

    $$selectedPONumber = signal('');

    updatePONumber(poNumber: string) {
        this.$$selectedPONumber.set(poNumber);
    }

}