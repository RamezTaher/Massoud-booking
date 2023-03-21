import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { StorageService } from 'sharedServices';
import { HttpClient } from '@angular/common/http';
import { BaseGetService } from '../../services/api/base/get-service';
import { Endpoints } from '../../constants/endpoints';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-choice-card',
  templateUrl: './choice-card.component.html',
  styleUrls: ['./choice-card.component.scss'],
})
export class ChoiceCardComponent implements OnInit {
  @Output() close = new EventEmitter<Event>();
  @Output() search = new EventEmitter<Event>();
  @Output() closeChoiceCard = new EventEmitter<Event>();

  @Input() queries: any;

  isDirectionsOpen: boolean = false;
  isDirectionsAvailable: boolean = false;
  isSearch: boolean = false;
  code: string = '';
  citiesService: BaseGetService;

  currentDirection?: { text: string; value: number };
  directions = [{ text: ' ', value: 0 }];
  currentCheckIn?: string;
  currentCheckOut?: string;
  currentPromocode = '';

  constructor(
    public storageService: StorageService,
    private router: Router,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {
    this.citiesService = new BaseGetService(httpClient);

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home' || event.url === '/') {
          this.isDirectionsAvailable = true;
          this.isSearch = false;
        } else if (event.url.split('?')[0] === '/search') {
          this.isSearch = true;
        } else {
          this.isDirectionsAvailable = false;
          this.isSearch = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.citiesService.get(Endpoints.cities_get);
    this.citiesService.state$.subscribe((x) => {
      if (!x.empty && x.data && x.data.length > 0) {
        this.directions = x?.data?.map(
          (element: { NameAr: any; Name: any; Id: any }) => {
            return {
              text: element.NameAr ?? element.Name,
              value: element.Id,
            };
          }
        );
        console.log(this.directions);
      }
    });

    if (this.queries?.city) {
      this.currentDirection = this.directions.filter(
        (d) => d.value == this.queries.city
      )[0];
    }
  }

  onClose(event: Event) {
    this.closeChoiceCard.emit(event);
  }
  onSearch() {
    let searchObject: any = {};
    if (this.currentDirection?.value) {
      searchObject['city'] = this.currentDirection?.value;
    } else {
      searchObject['city'] = 1;
    }
    if (this.currentPromocode) {
      searchObject['promocode'] = this.currentPromocode;
    }

    if (this.currentCheckIn) {
      searchObject['checkin'] = this.currentCheckIn;
    }

    if (this.currentCheckOut) {
      searchObject['checkout'] = this.currentCheckOut;
    }

    this.search.emit(searchObject);
  }

  changeDirection(direction: { text: string; value: number }) {
    this.directionToggle();
    if (direction.value) {
      this.currentDirection = direction;
    }
  }

  changeDates(dates: { checkIn: string; checkOut: string }) {
    this.currentCheckIn = this.datePipe.transform(dates.checkIn, 'yyyy-MM-dd')!;
    this.currentCheckOut = this.datePipe.transform(
      dates.checkOut,
      'yyyy-MM-dd'
    )!;
  }

  directionToggle() {
    this.isDirectionsOpen = !this.isDirectionsOpen;
  }
}
