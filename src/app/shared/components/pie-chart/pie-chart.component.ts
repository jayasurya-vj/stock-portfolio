import { Component, inject, input, OnInit, signal } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { PortfolioStock } from '../../../core/models/portfolio.model';

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  protected portfolioList = signal<PortfolioStock[]>([]);
  chartOptionsCurrentValue: Highcharts.Options = {} ;
  chartOptionsBuyingValue: Highcharts.Options = {} ;
  chartOptionsYield: Highcharts.Options = {} ;
  Highcharts: typeof Highcharts = Highcharts;

  ngOnInit() {
    this.portfolioService.getPortfolio().subscribe(data => {
      this.portfolioList.set(data);
      this.getHighCurrentValuechartsOptions();
      this.getHighchartsBuyingValueOptions();
      this.getHighchartsYieldOptions();
    })
  }

  getHighCurrentValuechartsOptions() {
    let datapoints = this.portfolioList().map(stock => { return { name: stock.symbol, y: stock.currentValue } });
    this.chartOptionsCurrentValue = {
      title: { text: "Current value" },
      tooltip: {
        valueSuffix: 'EUR'
      },
      series: [{
        name: 'Current value',
        cursor: 'pointer',
        data: datapoints,
        type: 'pie'
      }],
      lang: {
        noData: 'No data to display'
      },
      noData: {
        position: {
          align: 'center'
        }
      }
    }; 
  }
  getHighchartsBuyingValueOptions() {
    let datapoints =  this.portfolioList().map(stock => { return { name: stock.symbol, y: Number(stock.totalBuyingValue) } });
    this.chartOptionsBuyingValue = {
      title: { text: "Buying Value" },
      tooltip: {
        valueSuffix: 'EUR'
      },
      series: [{
        name: 'BuyingValue',
        cursor: 'pointer',
        data: datapoints,
        type: 'pie'
      }],
      lang: {
        noData: 'No data to display'
      },
      noData: {
        position: {
          align: 'center'
        }
      }
    }; 
  }
  getHighchartsYieldOptions() {
    let datapoints =  this.portfolioList().map(stock => { return { name: stock.symbol, y: stock.yield } });
    this.chartOptionsYield = {
      title: { text: "Yield" },
      tooltip: {
        valueSuffix: 'EUR'
      },
      series: [{
        name: 'Yield',
        cursor: 'pointer',
        data: datapoints,
        type: 'pie'
      }],
      lang: {
        noData: 'No data to display'
      },
      noData: {
        position: {
          align: 'center'
        }
      }
    }; 
  }

}

