import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  public constructor(private readonly http: HttpService) {}

  public checkURL(url: string): Observable<AxiosResponse<boolean>> {
    return this.http.get<boolean>(url);
  }
}
