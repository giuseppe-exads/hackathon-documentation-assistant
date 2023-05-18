import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
})
export class TypewriterDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const text = this.elementRef.nativeElement.textContent;
    this.elementRef.nativeElement.textContent = '';

    let index = 0;
    const typeEffect = setInterval(() => {
      if (text[index] === ' ') {
        this.elementRef.nativeElement.innerHTML += '&nbsp;';
      } else {
        this.elementRef.nativeElement.textContent += text[index];
      }
      index++;
      if (index === text.length) {
        clearInterval(typeEffect);
      }
    }, 10);
  }
}
