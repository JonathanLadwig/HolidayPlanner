import { Component, Input } from '@angular/core';
import { IActivity } from 'src/app/models/Trip';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Input() activity: IActivity | undefined;
  constructor() { }
}
