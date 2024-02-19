import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, map, mergeMap, toArray } from 'rxjs';
import { Lineup, LineupResponse } from './app.model';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getLineup(): Observable<Lineup[]> {
    this.logger.log(`Making lineup request to ${process.env.HDHR_URL}lineup.json`);
    return this.httpService.get<LineupResponse[]>(`${process.env.HDHR_URL}lineup.json`).pipe(
      mergeMap(response => response.data),
      map<LineupResponse, Lineup>(lineup => ({
        name: lineup.GuideName,
        number: lineup.GuideNumber,
        url: lineup.URL,
        hd: lineup.HD === 1,
        videoCodec: lineup.VideoCodec,
        audioCodec: lineup.AudioCodec,
      })),
      toArray()
    );
  }
}
