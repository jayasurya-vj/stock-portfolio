import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StockPriceDataResponse } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  private http = inject(HttpClient);
  private apiUrl: string = "https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data";

  constructor() { }

  getStockPriceData(symbol:string){
    return this.http.get<StockPriceDataResponse>(`${this.apiUrl}/${symbol}`);
  }

  getStockPriceDataArray(symbols:string[]){
    let symbolsStr : string = symbols.map(symbol=>`vwdkey=${symbol}`).join("&");
    return this.http.get<StockPriceDataResponse[]>(`${this.apiUrl}?${symbolsStr}`);
  }
}
