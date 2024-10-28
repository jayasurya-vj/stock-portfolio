import { Component, inject, OnInit, signal } from '@angular/core';
import { PercentPipe, CurrencyPipe } from '@angular/common';
import { ComponentType, PortfolioStock, PortfolioOptions, ActionType } from '../../../core/models/portfolio.model';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { componentMapDefault } from '../../../core/defaults/portfolio';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'portfolio-table',
  standalone: true,
  imports: [CustomButtonComponent, PercentPipe, CurrencyPipe],
  templateUrl: './portfolio-table.component.html',
  styleUrl: './portfolio-table.component.css'
})
export class PortfolioTableComponent implements OnInit {

  public readonly portfolioTableHeaders = ["Symbol", "Name", "Current price", "Number of contracts", "Total Buy value", "Current value", "Net Yield", "% Net Yield"];
  public readonly portfolioTableOptions = Object.values(PortfolioOptions);


  private portfolioService = inject(PortfolioService);
  public readonly modalService = inject(ModalService);

  portfolioList = signal<PortfolioStock[]>([]);
  showModalPopUp = signal(false);
  modalComponent = signal(componentMapDefault.stockFormBuy);


  ngOnInit() {
    this.portfolioService.getPortfolio().subscribe(data => {
      this.portfolioList.set(data);
    })
  }

  onOptionClick(type: string, data: PortfolioStock) {
    let component : ComponentType | null = null;

    switch (type) {
      case PortfolioOptions.Buy: {
        component = {
          component: componentMapDefault.stockFormBuy.component,
          inputs: {
            type : ActionType.Buy,
             symbol : data.symbol
          }        
        }

        this.modalService.modalComponent.set(component);
        break;
      }
      case PortfolioOptions.Sell: {
        component = {
          component: componentMapDefault.stockFormSell.component,
          inputs: {
            type : ActionType.Sell,
             symbol : data.symbol,
             currentPrice: data.currentPrice,
             maxContracts: data.noContracts
          }        
        }

        this.modalService.modalComponent.set(component);
        break;
      }
      case PortfolioOptions.Transactions: {

        if (data.transactionsList) {
           component= {
            component: componentMapDefault.transactions.component,
            inputs: {
              "transactionsDataList": data.transactionsList
            }
          }

          this.modalService.modalComponent.set(component);
        }

        break;
      }
      case PortfolioOptions.DayMarketChange: {
         component= {
          component: componentMapDefault.dayMarketChange.component,
          inputs: {
            "stock": data,
            "type": "day"
          }        
        }
        this.modalService.modalComponent.set(component);

        break;
      }
      case PortfolioOptions.YearMarketChange: {
         component = {
          component: componentMapDefault.yearMarketChange.component,
          inputs: {
            "stock": data,
            "type": "year"
          }        
        }
        this.modalService.modalComponent.set(component);

        break;
      }
      default: {
        break;
      }
    }
    if (component != null) {
      this.modalService.showModal.set(true);
    }


  }
}
