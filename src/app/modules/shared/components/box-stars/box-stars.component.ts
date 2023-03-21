import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-stars',
  templateUrl: './box-stars.component.html',
  styleUrls: ['./box-stars.component.scss'],
})
export class BoxStarsComponent implements OnInit {
  @Input() count = 5;

  constructor() {}

  ngOnInit(): void {}

  get Count() {
    return Array.from(Array(this.count).keys());
  }
}
