import { ValidatorFn, AbstractControl} from '@angular/forms';

export const userNamePassowrd: ValidatorFn = (formgroup: AbstractControl) => {

  const userName = formgroup.get('userName')?.value.trim();
  const password = formgroup.get('password')?.value.trim();

  if (userName && password) {

    return userName != password
      ? null
      : { userNamePassowrd: true };
  } else {
    return null;
  }

}
