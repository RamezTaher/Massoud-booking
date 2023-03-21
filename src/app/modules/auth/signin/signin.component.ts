import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endpoints } from '../../shared/constants/endpoints';
import { BasePostPatchDeleteService } from '../../shared/services/api/base/post-patch-delete-service';
import { SigninService } from '../../shared/services/form-module/signin.service';

import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @Output() closeSignin = new EventEmitter<Event>();
  @Output() openForgotEvent = new EventEmitter<Event>();

  isPasswordShown: boolean = false;
  
  user_form = new FormGroup({
    UserName: new FormControl('', [Validators.email, Validators.required]),
    Password: new FormControl('', Validators.required),
  });
  submitted = false;
  constructor(
    private router: Router,
    private storageService: StorageService,
    public httpService: BasePostPatchDeleteService,
    public signinService: SigninService
  ) {}

  ngOnInit(): void {
    this.httpService.state$.subscribe((x) => {
      if (x.success && x.data.success) {
        this.storageService.user = x.data.user;
        this.storageService.token = x.data.token;
        this.signinService.close();
        this.router.navigateByUrl('/');
      }
    });
  }

  onClose(event: Event) {
    this.closeSignin.emit(event);
  }
  onOpenForgot(event: Event) {
    this.openForgotEvent.emit(event);
  }

  login() {
    this.submitted = true;
    if (this.user_form.valid) {
      this.httpService.post(Endpoints.account_login, this.user_form.value);
    }
  }

  ngOnDestroy() {
    this.httpService.destroy();
  }
}
