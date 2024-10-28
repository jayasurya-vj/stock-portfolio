import { Component, inject, input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChartModule } from 'highcharts-angular';
import { MarketChangeSimulatorService } from '../../../core/services/market-change-simulator.service';
import { PortfolioStock } from '../../../core/models/portfolio.model';

@Component({
  selector: 'market-change-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './market-change-chart.component.html',
  styleUrl: './market-change-chart.component.css',
  providers:[MarketChangeSimulatorService]
})
export class MarketChangeChartComponent implements OnInit {

  type = input<"day"|"year">("day");
  stock = input.required<PortfolioStock>();

  marketChangeSimulatorService=inject(MarketChangeSimulatorService);
  private data :number[][] = [];
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {} ;


  ngOnInit(): void {
    let currentDayPrices = Object.values(this.stock().currentDayPrices);

    if(this.type()=="day" && this.marketChangeSimulatorService.isTimeGreaterThanMartketStartTime()){

      
      
      
    this.data = this.marketChangeSimulatorService.getCandleStickChartDataForToday(currentDayPrices);
    this.chartOptions= {
      title: { text: this.stock().name },
      tooltip: {
        valueSuffix: 'EUR'
      },
      subtitle: {
        text:
          'Day Market Change'
      },
      rangeSelector: {
      enabled:false
        
      },
      navigator: {
        enabled: true,
      },
      
      plotOptions: {
        candlestick: {
          color: 'pink',
          lineColor: 'red',
          upColor: 'lightgreen',
          upLineColor: 'green'
        }
      },
  
  
      series: [{
        name: 'Market Change',
        data: this.data,
        type: 'candlestick',
  
        tooltip: {
          valueDecimals: 2
        }
      }],
      
    };
    }else{
      this.data = this.marketChangeSimulatorService.getCandleStickChartDataFor1Year(currentDayPrices).reverse();
    
    this.chartOptions= {
      title: { text: this.stock().name  },
      tooltip: {
        valueSuffix: 'EUR'
      },
      subtitle: {
        text:
          'Year Market Change'
      },
      rangeSelector: {
        selected: 1,        
      },
      navigator: {
        enabled: true,
      },
      
      plotOptions: {
        candlestick: {
          color: 'pink',
          lineColor: 'red',
          upColor: 'lightgreen',
          upLineColor: 'green'
        }
      },
  
  
      series: [{
        name: 'Market Change',
        data: this.data,
        type: 'candlestick',
  
        tooltip: {
          valueDecimals: 2
        }
      }],
      
    };
    }
  }



  

}
