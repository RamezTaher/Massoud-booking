import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { InfoPayComponent } from './info-pay/info-pay.component';
import { PagesComponent } from './pages.component';
import { PaiementComponent } from './paiement/paiement.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent, // HomeComonent
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'hotels',
        component: HotelsComponent,
      },
      {
        path: 'search',
        component: SearchHotelComponent,
      },
      {
        path: 'details/:hotelId',
        component: DetailsComponent,
      },
      {
        path: 'info-paiement',
        component: InfoPayComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'paiement',
        component: PaiementComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'booking-success',
        component: BookingSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
