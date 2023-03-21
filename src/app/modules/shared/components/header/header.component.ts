import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SigninService } from '../../services/form-module/signin.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isForgot: boolean = false;
  returnHeader: boolean = false;
  return: string = '';

  constructor(
    private router: Router,
    public signinService: SigninService,
    public storageService: StorageService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/search') {
          this.returnHeader = true;
          this.return = '/home';
        } else if (event.url === '/search/details') {
          this.returnHeader = true;
          this.return = '/search';
        } else if (event.url === '/info-paiement') {
          this.returnHeader = true;
          this.return = '/search/details';
        } else if (event.url === '/paiement') {
          this.returnHeader = true;
          this.return = '/info-paiement';
        } else {
          this.returnHeader = false;
        }
      }
    });
  }

  ngOnInit(): void {}

  onToggle() {
    this.isMobile = true;
  }
}
