import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { environment } from '../environments/environment';
import { ActivityEffects } from './Ngrx-store/Ngrx-effects/activity.effects';
import { HolidayEffects } from './Ngrx-store/Ngrx-effects/holiday.effects';
import * as fromActivity from './Ngrx-store/Ngrx-reducers/activity.reducer';
import * as fromHoliday from './Ngrx-store/Ngrx-reducers/holiday.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateNewActivityFormComponent } from './components/create-new-activity-form/create-new-activity-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HolidayTabComponent } from './components/holiday-tab/holiday-tab.component';
import { ActivityComponent } from './components/holiday-viewer/activity.component';
import { LoginComponent } from './components/login/login.component';
import { NewHolidayTabComponent } from './components/new-holiday-tab/new-holiday-tab.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './shared/auth.service';

export const metaReducers: MetaReducer<any>[] = [debug];
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    // if (
    //   action.type == '[Trip] Get All Itinerary Items' ||
    //   action.type == '[Trip] Get All Trips'
    // ){
    console.log(action.type, action);
    console.log('current state', state)
    console.log('future value of state', reducer(state, action));
    // }
    return reducer(state, action);
  };
}

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CalendarComponent,
    CreateNewActivityFormComponent,
    ActivityCardComponent,
    ActivityComponent,
    NewHolidayTabComponent,
    HolidayTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzFormModule,
    NzCalendarModule,
    NzIconModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzBadgeModule,
    NzInputModule,
    NzSelectModule,
    NzTabsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(fromHoliday.holidayFeatureKey, fromHoliday.reducer),
    StoreModule.forFeature(fromActivity.activityFeatureKey, fromActivity.reducer),
    EffectsModule.forFeature([HolidayEffects, ActivityEffects]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: PERSISTENCE, useValue: 'local' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
