import { Component, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import QRCode from 'qrcode';
import Konva from 'konva';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

type CheckURLResponse = {
  accessible?: boolean;
  found?: boolean;
};

type QRCodeError = {
  notFound?: boolean;
  invalidURL?: boolean;
  notSecureURL?: boolean;
};

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string | null | SafeValue) {
    if (url === null) {
      return '';
    }
    return this.domSanitizer.sanitize(SecurityContext.URL, url);
  }
}

@Component({
  selector: 'onesec-qrcodes',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, SafePipe, FontAwesomeModule],
  templateUrl: './qrcodes.component.html',
  styleUrl: './qrcodes.component.scss'
})
export class QrcodesComponent {
  public qrcodeURL = new FormControl('', Validators.required);

  public error?: QRCodeError;
  public invalidURL?: boolean;
  public submitted: boolean = false;

  public constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) {}

  public submitURL() {
    const url = this.qrcodeURL.value;

    this.submitted = true;
    console.log('submit! invalid: ', this.qrcodeURL.invalid);

    this.error = undefined;
    this.invalidURL = undefined;

    if (url === null || url === undefined || this.qrcodeURL.invalid) {
      this.error = { invalidURL: true };
      this.invalidURL = true;
      return;
    } else if (!url.startsWith('https://')) {
      this.error = { notSecureURL: true };
      this.invalidURL = true;
      // error
      return;
    }

    // check url exists
    this.http
      .post<CheckURLResponse>('/api/check', { url: url })
      .subscribe((res: CheckURLResponse) => {
        console.debug('valid url: ', res.found, res.accessible);

        if (res.found === false) {
          this.error = { notFound: true };
          this.invalidURL = true;
        } else {
          this.invalidURL = false;
          this.generateKonva(url);
        }
      });
  }

  private generateKonva(url: string) {
    const stage = new Konva.Stage({
      container: 'konva-container',
      width: 500,
      height: 800
    });

    const layer = new Konva.Layer();

    const rect = new Konva.Rect({
      stroke: 'black',
      fill: 'blue',
      height: 800,
      width: 500
    });

    const headerText = new Konva.Text({
      y: 60,
      text: 'Please find the relevant documents at\n',
      fontSize: 16,
      width: 500,
      fill: 'black',
      stroke: 'white',
      fontFamily: 'Calibri',
      align: 'center'
    });

    const cv = document.createElement('canvas');
    QRCode.toCanvas(cv, url, {
      width: 300,
      margin: 2
    });

    const img = new Konva.Image({
      image: cv,
      width: 300,
      height: 300,
      y: 100,
      x: 20
    });

    layer.add(rect);
    layer.add(headerText);
    layer.add(img);
    stage.add(layer);
  }
}
