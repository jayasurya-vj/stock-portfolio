

import { TestBed } from '@angular/core/testing';
import { MarketChangeSimulatorService } from './market-change-simulator.service';

describe('MarketChangeSimulatorService', () => {
  let service: MarketChangeSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketChangeSimulatorService]
    });
    service = TestBed.inject(MarketChangeSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate candlestick chart data for one year', () => {
    const initialData = [100, 110, 90, 105]; 
    const chartData = service.getCandleStickChartDataFor1Year(initialData);
    
    expect(chartData).toBeTruthy(); 
    expect(chartData.length).toBeGreaterThan(0); 
    expect(chartData[0]).toEqual(jasmine.arrayContaining([jasmine.any(Number), ...initialData])); 
  });

  it('should generate candlestick chart data for today', () => {
    const initialData = [100, 110, 90, 105]; 
    const chartData = service.getCandleStickChartDataForToday(initialData);
    
    expect(chartData).toBeTruthy(); 
    expect(chartData.length).toBeGreaterThan(0); 
    expect(chartData[0][1]).toBe(initialData[0]); 
  });
});
