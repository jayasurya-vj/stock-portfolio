import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketChangeChartComponent } from './market-change-chart.component';

describe('MarketChangeChartComponent', () => {
  let component: MarketChangeChartComponent;
  let fixture: ComponentFixture<MarketChangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketChangeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketChangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
