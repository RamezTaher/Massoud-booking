import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';

import { HeaderComponent } from './components/header/header.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DirectionsComponent } from './components/directions/directions.component';
import { ClickAwayDirective } from './directives/click-away.directive';
import { FooterComponent } from './components/footer/footer.component';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { FilterComponent } from './components/filter/filter.component';
import { ChoiceCardComponent } from './components/choice-card/choice-card.component';
import { ClassificatorComponent } from './components/classificator/classificator.component';

import { RoomItemComponent } from './components/room-item/room-item.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HotelItemComponent } from './components/hotel-item/hotel-item.component';
import { BoxStarsComponent } from './components/box-stars/box-stars.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { MaskComponent } from './components/mask/mask.component';
import { CardLoaderComponent } from './components/card-loader/card-loader.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    HeaderComponent,
    ClickAwayDirective,
    FooterComponent,
    PaginatorComponent,
    FilterComponent,
    ChoiceCardComponent,
    ClassificatorComponent,
    DirectionsComponent,
    RoomItemComponent,
    BreadcrumbComponent,
    HotelItemComponent,
    BoxStarsComponent,
    HotelCardComponent,
    DatePickerComponent,
    MaskComponent,
    CardLoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forChild(),
    RouterModule,
    BsDatepickerModule.forRoot(),
    AuthModule,
    GoogleMapsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    ClickAwayDirective,
    FooterComponent,
    TranslateModule,
    AuthModule,
    PaginatorComponent,
    FilterComponent,
    ChoiceCardComponent,
    ClassificatorComponent,
    DirectionsComponent,
    RoomItemComponent,
    BreadcrumbComponent,
    BsDatepickerModule,
    HotelCardComponent,
    HotelItemComponent,
    BoxStarsComponent,
    DatePickerComponent,
    MaskComponent,
    GoogleMapsModule,
    CardLoaderComponent,
  ],
})
export class SharedModule {}
