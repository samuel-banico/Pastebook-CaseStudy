import { Component, ElementRef, HostListener } from '@angular/core';
import { TokenService } from '@services/token.service';


@Component({
  selector: 'app-friend-options',
  templateUrl: './friend-options.component.html',
  styleUrls: ['./friend-options.component.css']
})
export class FriendOptionsComponent {
  optionsAppear = false;

  constructor(
    private elemRef: ElementRef,
    private tokenService: TokenService
  ) {
    this.tokenService.validateToken();
  }

  optionsDropdown()
  {
  console.log(this.optionsAppear);
  this.optionsAppear = !this.optionsAppear;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      // Click occurred outside the dropdown, close it
      this.optionsAppear = false;
    }
  }
}
