import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  @HostListener('mouseover')
  darkenOn() {
    this.render.setStyle(this.el.nativeElement, 'filter', 'opacity(.9)');
  }

  @HostListener('mouseleave')
  darkenOff() {

    this.render.setStyle(this.el.nativeElement, 'filter', 'opacity(1)');
  }
}
