import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {}

  @HostListener('mouseenter')
  mouseEnter() {
    this.element.nativeElement.style.backgroundColor = '#e3e3ed';
  }
  @HostListener('mouseleave')
  mouseLeave() {
    this.element.nativeElement.style.backgroundColor = 'rgb(244 244 248)';
  }
}
