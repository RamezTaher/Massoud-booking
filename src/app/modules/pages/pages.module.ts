import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';

import { ContactUsComponent } from './contact-us/contact-us.component';
import { HotelsComponent } from './hotels/hotels.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { DetailsComponent } from './details/details.component';
import { InfoPayComponent } from './info-pay/info-pay.component';
import { PaiementComponent } from './paiement/paiement.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ContactUsComponent,
    HotelsComponent,
    SearchHotelComponent,
    DetailsComponent,
    InfoPayComponent,
    PaiementComponent,
    BookingSuccessComponent,
  ],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
  providers: [],
})
export class PagesModule {}
