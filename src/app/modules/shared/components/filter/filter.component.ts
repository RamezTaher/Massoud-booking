import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() closeFilter = new EventEmitter<Event>();

  activeBox: Array<boolean> = [false, false, false, false, false];

  constructor() {}

  ngOnInit(): void {}

  onClose(event: Event) {
    this.closeFilter.emit(event);
  }
}
