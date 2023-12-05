import { Component } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent {
  darkMode: boolean = false;
  constructor(private darkModeService: DarkModeService) {
    let x = JSON.parse(localStorage.getItem('dark-mode')!);
    this.darkMode = x.darkMode;
   }

  toggleDarkMode() {
    this.darkModeService.toggle();
  }
}
