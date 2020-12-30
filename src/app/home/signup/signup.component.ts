import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoweCaseValidator } from 'src/app/shared/validators/lowercase.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePassowrd } from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  @ViewChild('userNameInput') userEmailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignupService,
    private route: Router,
    private platformDetectorService: PlataformDetectorService
  ) { }

  ngOnInit() {

    const userValid = this.userNotTakenValidatorService.checkUserNameTaken();

    this.signupForm = this.formBuilder.group({

      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',

        [
          Validators.required,
          LoweCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        userValid
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    },
    {
      validator: userNamePassowrd
    });

  }


  ngAfterViewInit() {
    this.platformDetectorService.isPlatformBrowser() &&
      this.userEmailInput.nativeElement.focus();
  }

  signup() {

    if (this.signupForm.valid && !this.signupForm.pending) {

      const newUser = <NewUser>this.signupForm.getRawValue();

      this.signUpService
        .signup(newUser)
        .subscribe(
          () => this.route.navigate(['']),
          err => console.log(err)

        )
     }
  }
}
