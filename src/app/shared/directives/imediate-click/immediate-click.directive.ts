import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlataformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[immediateCLick]'
})
export class ImmediateClickDirective implements OnInit{

  constructor(
    private element : ElementRef<any>,
    private platformDetectorService : PlataformDetectorService
  ){}

  ngOnInit() {

    this.platformDetectorService.isPlatformBrowser() &&
        this.element.nativeElement.click();
  }
}
