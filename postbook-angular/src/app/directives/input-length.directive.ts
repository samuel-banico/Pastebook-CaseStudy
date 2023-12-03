import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInputLength]'
})
export class InputLengthDirective {
  @Input() appInputLength: number = 2000;
  @Output() remainingCharacters = new EventEmitter<number>();

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const trimmedValue = inputElement.value.slice(0, this.appInputLength);

    if (inputElement.value !== trimmedValue) {
      inputElement.value = trimmedValue;
      inputElement.dispatchEvent(new Event('input'));
    }

    const remainingChars = this.appInputLength - inputElement.value.length;
    this.remainingCharacters.emit(remainingChars);
  }

}
