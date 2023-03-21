import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from 'sharedConstants';
import { BaseGetService, StorageService } from 'sharedServices';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss'],
})
export class SearchHotelComponent implements OnInit {
  isFilterOpen: boolean = false;
  isChoiceOpen: boolean = false;
  isClassOpen: boolean = false;
  desktopFilter: boolean = false;
  deskFilter: string = 'الأقل سعرا';
  citiesService: BaseGetService;
  directions: any[] = [];
  currentCheckIn?: Date;
  currentCheckOut?: Date;

  currentPage = 1;
  hotelsService: BaseGetService;
  currentDirection?: { text: string; value: number };

  activeClass: number = 0;
  items = [
    {
      value: 'الأقل سعرا',
    },
    {
      value: 'الأكثر سعرا',
    },
    {
      value: 'الاعلى تصنيفا',
    },
  ];

  constructor(
    public storageService: StorageService,
    private router: Router,
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    this.hotelsService = new BaseGetService(httpClient);
    this.citiesService = new BaseGetService(httpClient);
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
      }

      if (this.getQueriesObject()?.city) {
        this.currentDirection = this.directions.filter(
          (d) => d.value == this.getQueriesObject()?.city
        )[0];
      }
    });

    this.hotelsService.get(
      Endpoints.hotels_availabilities_get,
      this.getQueriesObject()
    );
  }

  getQueriesObject(): any {
    const queriesObject: any = {};
    const urlQueries = this.route.snapshot.queryParams;
    if (urlQueries['city']) {
      queriesObject.city = urlQueries['city'];
    }
    if (urlQueries['checkin']) {
      queriesObject.checkin = urlQueries['checkin'];
      this.currentCheckIn = new Date(urlQueries['checkin']);
    }
    if (urlQueries['checkout']) {
      queriesObject.checkout = urlQueries['checkout'];
      this.currentCheckOut = new Date(urlQueries['checkout']);
    }
    if (urlQueries['promocode']) {
      queriesObject.promocode = urlQueries['promocode'];
    }
    return queriesObject;
  }

  search(searchObject: any) {
    this.router.navigate(['/search'], {
      queryParams: searchObject,
    });

    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() =>
        this.router.navigateByUrl(
          '/search?city=' +
            searchObject.city +
            '&checkin=' +
            searchObject.checkin +
            '&checkout=' +
            searchObject.checkout
        )
      );

    this.isChoiceOpen = false;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hotelsService.destroy();
  }

  openDetails(hotel: any) {
    this.router.navigate(['search/details']);
  }

  getMoreHotels() {
    this.hotelsService.get(Endpoints.hotels_availabilities_get, {});
  }
}
