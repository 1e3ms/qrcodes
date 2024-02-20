import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodesComponent } from './qrcodes/qrcodes.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'onesec-root',
  standalone: true,
  imports: [RouterOutlet, QrcodesComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
