import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  price: string;
}

interface CoinCapResponse {
  data: {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    priceUsd: string;
    supply: string;
    maxSupply?: string | null;
  }[];
  timestamp: number;
}

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getByLowestRank(): Observable<CryptoCoin[]> {
    return this.httpService
      .get<CoinCapResponse>('https://api.coincap.io/v2/assets', {
        params: {
          limit: 5,
        },
      })
      .pipe(
        map(({ data }) => data.data),
        map((coins) =>
          coins.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            rank: coin.rank,
            price: coin.priceUsd,
          })),
        ),
      );
  }
}
