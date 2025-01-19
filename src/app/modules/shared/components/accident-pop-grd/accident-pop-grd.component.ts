import {Component, effect, inject} from '@angular/core';
import {HospitalService} from "../../../hospital/service/hospital.service";
import {LoadingService, NotificationService} from "../../../../core";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-accident-pop-grd',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './accident-pop-grd.component.html',
  standalone: true,
  styleUrl: './accident-pop-grd.component.scss'
})
export class AccidentPopGrdComponent {

  hospitalService = inject(HospitalService)
  notification = inject(NotificationService);
  loading = inject(LoadingService);


  hospitalDTO = {
    id: 0,
    code: '',
    name: '',
    contactNumber: '',
    city: '',
    district: '',
    province: '',
    areaCovered: '',
  }


  constructor() {
    effect(() => {
      const pagination = this.hospitalService.stat()
      if (pagination) {

      }
    });
    effect(() => {
      const police = this.hospitalService.active()
      if (police) {
        this.hospitalDTO.id = police.hospitalId
        this.hospitalDTO.code = police.hospitalCode
        this.hospitalDTO.name = police.hospitalName
        this.hospitalDTO.contactNumber = police.contactNumber
        this.hospitalDTO.city = police.city
        this.hospitalDTO.district = police.district
        this.hospitalDTO.province = police.province
        this.hospitalDTO.areaCovered = police.coverdArea
      }
    });
  }



}
