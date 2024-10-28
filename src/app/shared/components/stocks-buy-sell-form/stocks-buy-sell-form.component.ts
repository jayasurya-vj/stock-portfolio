import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActionType } from '../../../core/models/portfolio.model';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { ModalService } from '../../../core/services/modal.service';
import { symbols } from '../../../core/defaults/portfolio';

@Component({
  selector: 'stocks-buy-sell-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stocks-buy-sell-form.component.html',
  styleUrl: './stocks-buy-sell-form.component.css'
})
export class StocksBuySellFormComponent {
  portfolioService = inject(PortfolioService);
  modalService = inject(ModalService);
  fb= inject(FormBuilder);

  type = input.required<ActionType>();
  symbol = input();
  maxContracts = input<number>(100);
  currentPrice = input<number>(1);

  isFormInitialized=signal(false);

  errMsg=signal<string|null>(null);
  
  stockForm: FormGroup = this.fb.group({});

  constructor() {
    effect(() => {
      if(this.type() == ActionType.Buy){
        this.stockForm = this.fb.group({
          symbol: [( this.symbol() ? {value: this.symbol(), disabled: true } : ""), Validators.required],
          contracts: [1, [Validators.required, Validators.min(1)]],
          price: [1, [Validators.required, Validators.min(0.1)]]    
    
        });
      }else{
        this.stockForm = this.fb.group({
          symbol: [ {value: this.symbol(), disabled: true}, Validators.required, ],
          contracts: [1, [Validators.required, Validators.pattern , Validators.min(1), Validators.max(this.maxContracts())]],
          price: [ {value: this.currentPrice(), disabled: true}, [Validators.required, Validators.min(0.1)]]    
    
        });
      }
      this.isFormInitialized.set(true);
    },{allowSignalWrites: true,});
  }
 

  onSubmit() {

    if(!symbols.includes(this.stockForm.controls['symbol'].value)){
      this.stockForm.controls['symbol'].setErrors({'incorrect': true});
       this.errMsg.set("Please enter valid  Symbol");
      return;
    }
    if (this.stockForm.valid) {
      console.log('Form submitted:', this.stockForm.value);
      this.errMsg.set(null);
      if(this.type()==ActionType.Buy){
        this.portfolioService.buyStocks(this.stockForm.controls['symbol'].value,
          this.stockForm.controls['contracts'].value,
          this.stockForm.controls['price'].value)
      }
      if(this.type()==ActionType.Sell){
        this.portfolioService.sellStocks(this.stockForm.controls['symbol'].value,
          this.stockForm.controls['contracts'].value,
          this.stockForm.controls['price'].value)
      }
      this.modalService.showModal.set(false);
      }else{
        this.errMsg.set("Please enter valid Details");
      }
     
  }
}
