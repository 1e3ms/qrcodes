/* Copyright (C) 2024  Joao Eduardo Luis <joao@1e3ms.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const FRONTEND_DIST =
  !!process.env.FRONTEND_DIST && process.env.FRONTEND_DIST !== ''
    ? process.env.FRONTEND_DIST
    : join(__dirname, '..', '..', 'frontend', 'dist', 'browser');

console.log('frontend dist: ', FRONTEND_DIST);

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: FRONTEND_DIST,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
