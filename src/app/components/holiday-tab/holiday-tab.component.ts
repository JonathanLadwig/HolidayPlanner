import { Component, Input } from '@angular/core';
import { IHoliday } from 'src/app/models/Trip';

@Component({
  selector: 'app-holiday-tab',
  templateUrl: './holiday-tab.component.html',
  styleUrls: ['./holiday-tab.component.scss']
})
export class HolidayTabComponent {
  @Input() holiday: IHoliday | undefined;
}
