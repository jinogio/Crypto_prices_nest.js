import { map, mergeMap, Observable, timer } from 'rxjs';
import { Controller, Sse } from '@nestjs/common';
import { AppService, CryptoCoin } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('sse')
  sse(): Observable<{ data: CryptoCoin[] }> {
    return timer(0, 30000).pipe(
      mergeMap(() => this.appService.getByLowestRank()),
      map((data) => ({ data })),
    );
  }
}
