import { Component, OnInit } from '@angular/core';
import { StorageService } from 'sharedServices';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  dir: string = '';
  hotel: string = '';

  constructor(public storageService: StorageService) {}

  ngOnInit(): void {}
}
