import {Component, effect, inject} from '@angular/core';
import {HospitalService} from "../../../hospital/service/hospital.service";
import {LoadingService, NotificationService} from "../../../../core";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {StatusBadgeComponent} from "../status-batch/status-batch.component";
import {AccidentService} from "../../../accident/service/accident.service";

@Component({
  selector: 'app-accident-pop-grd',
  imports: [
    TitleCasePipe,
    DatePipe,
    StatusBadgeComponent
  ],
  templateUrl: './accident-pop-grd.component.html',
  standalone: true,
  styleUrl: './accident-pop-grd.component.scss'
})
export class AccidentPopGrdComponent {

  accidentService = inject(AccidentService);
  notification = inject(NotificationService);
  loading = inject(LoadingService);




}
