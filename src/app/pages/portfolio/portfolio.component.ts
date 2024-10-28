import { Component, inject, OnInit, signal } from '@angular/core';
import { BackendService } from '../../core/services/backend.service';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { NgComponentOutlet } from '@angular/common';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { PortfolioService } from '../../core/services/portfolio.service';
import { componentMapDefault } from '../../core/defaults/portfolio';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { PortfolioTableComponent } from "../../shared/components/portfolio-table/portfolio-table.component";
import { ModalService } from '../../core/services/modal.service';
import { MarketChangeChartComponent } from "../../shared/components/market-change-chart/market-change-chart.component";
import { PortfolioSummaryComponent } from "../../shared/components/portfolio-summary/portfolio-summary.component";

@Component({
  selector: 'portfolio',
  standalone: true,
  imports: [NgComponentOutlet, PieChartComponent, CustomButtonComponent, ModalComponent, PortfolioTableComponent, MarketChangeChartComponent, PortfolioSummaryComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
  providers:[BackendService,PortfolioService,ModalService]
  
})
export class PortfolioComponent  {

  public readonly modalService = inject(ModalService);
 
  
  


 

  onBuyClick(){   
    this.modalService.modalComponent.set(componentMapDefault.stockFormBuy); 
    this.modalService.showModal.set(true);
  }

  onModalClose(){
    this.modalService.showModal.set(false);
  }

  

}
