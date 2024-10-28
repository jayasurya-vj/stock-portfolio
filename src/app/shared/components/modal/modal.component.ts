import { Component, inject, input, output, signal } from '@angular/core';
import { StocksBuySellFormComponent } from '../stocks-buy-sell-form/stocks-buy-sell-form.component';
import { ActionType } from '../../../core/models/portfolio.model';
import { componentMapDefault } from '../../../core/defaults/portfolio';
import { NgComponentOutlet } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  public readonly modalService = inject(ModalService); 

  onCloseModalPopUp(){
    this.modalService.showModal.set(false);
  }

  
 

  

}
