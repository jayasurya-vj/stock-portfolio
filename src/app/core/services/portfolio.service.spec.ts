

import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { BackendService } from './backend.service';
import { ActionType, PortfolioStock, StockPriceDataResponse, Transaction } from '../models/portfolio.model';
import { of } from 'rxjs';


fdescribe('PortfolioService', () => {
  let service: PortfolioService;
  let backendServiceSpy: jasmine.SpyObj<BackendService>;

  let mockResp:StockPriceDataResponse[] = 	
  [
    {
      "vwdKey": "AALB.NL",
      "name": "AALBERTS NV",
      "isin": "NL0000852564",
      "currency": "EUR",
      "price": 33.92,
      "time": "2024-10-28T11:14:16+01:00",
      "open": 34.12,
      "high": 34.24,
      "low": 33.9,
      "close": 0,
      "volume": 22485,
      "previousClose": 33.9,
      "previousCloseTime": "2024-10-25T00:00:00+02:00"
    },
    {
      "vwdKey": "ABN.NL",
      "name": "ABN AMRO BANK N.V.",
      "isin": "NL0011540547",
      "currency": "EUR",
      "price": 15.295,
      "time": "2024-10-28T11:12:01+01:00",
      "open": 15.275,
      "high": 15.355,
      "low": 15.265,
      "close": 0,
      "volume": 412599,
      "previousClose": 15.23,
      "previousCloseTime": "2024-10-25T00:00:00+02:00"
    }
  ]

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BackendService',["getStockPriceDataArray"]);

    TestBed.configureTestingModule({
      providers: [
        PortfolioService,
        { provide: BackendService, useValue: spy }
      ]
    });

    service = TestBed.inject(PortfolioService);
    backendServiceSpy = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
    backendServiceSpy.getStockPriceDataArray.and.returnValue(of(mockResp));
    
    
    const initialPortfolio = JSON.stringify([
      {
        symbol: 'AAPL.Q',
        name: 'Apple Inc.',
        currentPrice: 150,
        noContracts: 10,
        buyValue: 1000,
        currentValue: 1500,
        transactionsList: [],
        currentDayPrices: { open: 145, high: 155, low: 144, close: 150 }
      }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(initialPortfolio);
    spyOn(localStorage, 'setItem').and.callThrough(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize portfolio from local storage', () => {
    service.getPortfolio().subscribe(portfolio => {
      expect(portfolio.length).toBe(1);
      expect(portfolio[0].symbol).toBe('AAPL.Q');
    });
  });

  it('should check if symbol is a US stock', () => {
    expect(service.checkIfUSStock('AAPL.Q')).toBeTrue();
    expect(service.checkIfUSStock('GOOGL')).toBeFalse();
  });

  it('should buy stocks and update portfolio', () => {
    backendServiceSpy.getStockPriceDataArray.and.returnValue(of(mockResp));

    service.buyStocks('AALB.NL', 5, 15);

    service.getPortfolio().subscribe(portfolio => {
      expect(portfolio[0].noContracts).toBe(5);
      expect(portfolio[0].currentValue).toBe(15); 
      expect(localStorage.setItem).toHaveBeenCalledWith('portfolioList', jasmine.any(String));
    });
  });

  it('should sell stocks and update portfolio', () => {
    backendServiceSpy.getStockPriceDataArray.and.returnValue(of(mockResp));

    service.sellStocks('AALB.NL', 5, 15);

    service.getPortfolio().subscribe(portfolio => {
      expect(localStorage.setItem).toHaveBeenCalledWith('portfolioList', jasmine.any(String));
    });
  });

  it('should calculate portfolio summary', () => {
    service.calculatePortfolioSummary();

    service.getPortfolioSummary().subscribe(summary => {
      expect(summary).toBeTruthy();
      expect(summary?.totalCurrentValue).toBe(1500); 
      expect(summary?.totalBuyingValue).toBe(1000); 
      expect(summary?.yield).toBe(500); 
      expect(summary?.yieldPercentage).toBe(0.5); 
    });
  });
});

