import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { StorageService, TranslationService } from 'sharedServices';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService,
    private storageService: StorageService,
    @Inject(DOCUMENT) private _document: any
  ) {
    translate.addLangs(['en', 'ar']);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.storageService.lang) {
      //eception if the navigator lang is not en or ar
      this.storageService.lang = 'ar';
      // this.storageService.lang = navigator.language.split('-')[0];
    }

    this.translate.use(this.storageService.lang);
    this.translationService.setDirection();

    const dir = document.createAttribute('dir');
    dir.value = this.translate.currentLang == 'ar' ? 'rtl' : 'ltr';
    this._document.documentElement.dir = dir.value;
  }


}
