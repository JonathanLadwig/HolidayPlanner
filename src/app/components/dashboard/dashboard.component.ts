import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IHoliday } from 'src/app/models/Trip';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public allHolidays$: Observable<IHoliday[]> | undefined;

  constructor() { }
}
