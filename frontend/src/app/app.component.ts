import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrcodesComponent } from './qrcodes/qrcodes.component';

@Component({
  selector: 'onesec-root',
  standalone: true,
  imports: [RouterOutlet, QrcodesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '1e3ms-qrcodes';
}
