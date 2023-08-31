import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appMissingImage]'
})
export class MissingImageDirective {

  constructor(private el: ElementRef) { }

  @HostListener("error")
  private onError() {
    this.el.nativeElement.style.display = "none";
  }
}
