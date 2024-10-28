
import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { StockPriceDataResponse } from '../models/portfolio.model';

describe('BackendService', () => {
  let service: BackendService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://test.solutions.vwdservices.com/internal/intake-test/sample-data/price-data';
  const mockStockPriceData: StockPriceDataResponse = {
    vwdKey: 'AAPL',
    name: 'Apple Inc.',
    isin: 'US0378331005',
    currency: 'USD',
    price: 150,
    time: '2024-10-28T10:00:00Z',
    open: 145,
    high: 155,
    low: 140,
    close: 150,
    volume: 500000,
    previousClose: 148,
    previousCloseTime: '2024-10-27T16:00:00Z'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BackendService,
        provideHttpClient(),
        provideHttpClientTesting()  
      ]
    });

    service = TestBed.inject(BackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stock price data for a single symbol', () => {
    const symbol = 'AAPL';

    service.getStockPriceData(symbol).subscribe(data => {
      expect(data).toEqual(mockStockPriceData);
    });

    const req = httpMock.expectOne(`${apiUrl}/${symbol}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStockPriceData); 
  });

  it('should fetch stock price data array for multiple symbols', () => {
    const symbols = ['AAPL', 'GOOGL'];
    const mockDataArray: StockPriceDataResponse[] = [mockStockPriceData, { ...mockStockPriceData, vwdKey: 'GOOGL' }];

    service.getStockPriceDataArray(symbols).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockDataArray);
    });

    const symbolsStr = symbols.map(symbol => `vwdkey=${symbol}`).join('&');
    const req = httpMock.expectOne(`${apiUrl}?${symbolsStr}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDataArray);  
  });
});