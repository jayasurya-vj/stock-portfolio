
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { PortfolioSummaryComponent } from './portfolio-summary.component';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { of } from 'rxjs';
import { PortfolioSummary, PortfolioStock, ActionType, Transaction, CurrentDayPrices } from '../../../core/models/portfolio.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';

describe('PortfolioSummaryComponent', () => {
  let component: PortfolioSummaryComponent;
  let fixture: ComponentFixture<PortfolioSummaryComponent>;
  let mockPortfolioService: jasmine.SpyObj<PortfolioService>;
  

  const mockPortfolioSummary: PortfolioSummary = {
    totalContractsBought: 50,
    totalBuyingValue: 10000,
    totalCurrentValue: 12000,
    yield: 2000,
    yieldPercentage: 0.20
  };

  const mockPortfolioStock: PortfolioStock = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 150,
    currentPriceInUSD: 150,
    noContracts: 10,
    buyValue: 1400,
    currentValue: 1500,
    totalContractsBought: 20,
    totalContractsSold: 5,
    avgBuyingValue: 145,
    totalBuyingValue: 2900,
    yield: 100,
    yieldPercentage: 0.034,
    transactionsList: [
      {
        type: ActionType.Buy,
        noContracts: 5,
        pricePerContract: 140,
        totalValue: 700,
      },
      {
        type: ActionType.Sell,
        noContracts: 2,
        pricePerContract: 150,
        totalValue: 300,
      }
    ],
    currentDayPrices: {
      open: 145,
      high: 155,
      low: 140,
      close: 150,
    }
  };

  beforeEach(async () => {
    mockPortfolioService = jasmine.createSpyObj('PortfolioService', ['getPortfolioSummary']);
    mockPortfolioService.getPortfolioSummary.and.returnValue(of(mockPortfolioSummary));

    await TestBed.configureTestingModule({
      imports: [PortfolioSummaryComponent],
      providers: [
        { provide: PortfolioService, useValue: mockPortfolioService },
        CurrencyPipe,
        PercentPipe,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject PortfolioService', () => {
    expect(component['portfolioService']).toBeTruthy();
  });

  it('should set portfolioSummary on initialization with correct values', fakeAsync(() => {
    component.ngOnInit();
    tick();  

    expect(component.portfolioSummary()).toEqual(mockPortfolioSummary);
    expect(mockPortfolioService.getPortfolioSummary).toHaveBeenCalled();
  }));
});