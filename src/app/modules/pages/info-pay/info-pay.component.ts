import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from 'sharedServices';
import { BaseGetService } from 'sharedServices';
import { Endpoints } from 'sharedConstants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninService } from "../../shared/services/form-module/signin.service";

@Component({
  selector: 'app-info-pay',
  templateUrl: './info-pay.component.html',
  styleUrls: ['./info-pay.component.scss'],
})
export class InfoPayComponent implements OnInit {
  rooms: any = [];
  total_price = 0;
  total_vat = 0;
  total_without_vat = 0;
  user_form = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.email, Validators.required]),
    Phone: new FormControl('', Validators.required),
    Notes: new FormControl(''),
  });

  constructor(
    private router: Router,
    private location: Location,
    public httpsService: BaseGetService,
    private storageService: StorageService,
    public signinService: SigninService
  ) {}

  ngOnInit(): void {
    this.rooms = this.storageService.selectedRooms;

    if (!this.rooms) {
      this.router.navigateByUrl('/');
    }
    this.rooms.forEach((x: any) => {
      this.total_price = this.total_price + x.PriceToPay * x.Quantity;
    });
    this.total_vat = this.total_price * 0.15;
    this.total_without_vat = this.total_price - this.total_vat;

    this.httpsService.get(
      Endpoints.hotels_details_get + this.rooms[0].HotelId,
      {}
    );
  }

  payment() {
    this.user_form.markAllAsTouched();
    if (this.user_form.valid) {
      if (this.storageService.isLogged()) {
        this.storageService.guest = this.user_form.value;
        this.router.navigateByUrl('/paiement');
      } else {
        this.signinService.open();
      }
    }
  }

  goBack() {
    this.location.back();
  }

  getRoomsNumbers() {
    let number = 0;
    this.rooms.forEach((x: any) => {
      number = number + x.Quantity;
    });
    return number;
  }
}
