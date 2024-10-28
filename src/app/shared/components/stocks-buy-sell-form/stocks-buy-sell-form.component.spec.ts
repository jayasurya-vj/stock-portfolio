import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksBuySellFormComponent } from './stocks-buy-sell-form.component';

describe('StocksBuySellFormComponent', () => {
  let component: StocksBuySellFormComponent;
  let fixture: ComponentFixture<StocksBuySellFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocksBuySellFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksBuySellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
