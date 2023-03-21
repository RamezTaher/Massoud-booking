import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseGetService } from '../../services/api/base/get-service';
import { Endpoints } from '../../constants/endpoints';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss'],
})
export class DirectionsComponent implements OnInit {
  @Output() closeDirections = new EventEmitter<Event>();
  selectedItem = { text: '', value: 0 };

  direction: string | null = '';
  citiesService: BaseGetService;
  directions: any[] = [];
  city: any;
  @Output() onChange = new EventEmitter<{
    text: string;
    value: number;
  }>();

  @Input() value?: number;

  constructor(
    private httpClient: HttpClient,
    public storageService: StorageService
  ) {
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
        if (this.city && this.city != '0') {
          this.selectedItem = this.directions.filter(
            (x: { [x: string]: any }) => x['value'] == this.city
          )[0];
        }
      }
    });
  }

  changeDirection(event: { text: string; value: number }) {
    this.selectedItem = event;
    this.onChange.emit(event);
  }
}
