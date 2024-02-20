import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { AxiosError } from 'axios';

class CheckURLPayload {
  url: string;
}

type CheckURLResponse = {
  found?: boolean;
  accessible?: boolean;
};

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Post('/api/check')
  public async checkURL(
    @Body() payload: CheckURLPayload,
  ): Promise<CheckURLResponse> {
    const { data }: { data: CheckURLResponse } = await firstValueFrom(
      this.appService.checkURL(payload.url).pipe(
        map((res) => {
          this.logger.debug(`result status: ${res.status}`);
          return {
            data: {
              found: true,
              accessible: true,
            },
          };
        }),
        catchError((error: AxiosError) => {
          this.logger.debug(`error checking url ${payload.url}: `, error);
          this.logger.debug(`status: ${error.status}, code: ${error.code}`);
          return of({ data: { accessible: false, found: false } });
        }),
      ),
    );
    return data;
  }
}
