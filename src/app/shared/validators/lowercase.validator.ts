import { AbstractControl } from '@angular/forms';

export function LoweCaseValidator(control: AbstractControl) {

  if (control.value.trim() && !(/^[a-z0-9_\-]+$/).test(control.value)) {

    return { lowerCase: true }
  }

  return null;

}
