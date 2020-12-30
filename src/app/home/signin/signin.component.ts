import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {

  fromUlr: string;
  loginForm: FormGroup;

  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute
      .queryParams
      .subscribe(params => this.fromUlr = params['fromUrl'])

    this.loginForm = this.formBuilder.group({

      userName: ['', Validators.required],
      password: ['', Validators.required]

    });
  }


  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {

    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.authenticate(userName, password)
      .subscribe(

        () => this.fromUlr
              ? this.router.navigateByUrl(this.fromUlr)
              : this.router.navigate(['user', userName])
        ,
        erro => {
          console.log(erro);

          this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
          this.loginForm.reset();
        }
      );
  }

}
