/* Copyright (C) 2024  Joao Eduardo Luis <joao@1e3ms.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 */
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
