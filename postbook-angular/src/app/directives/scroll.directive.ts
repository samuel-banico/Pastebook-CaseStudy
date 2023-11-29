import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class ScrollDirective {
  @Output() scrolled = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const element = event.target;

    // Detect if the user has reached the bottom of the container
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      this.scrolled.emit();
    }
  }

}
