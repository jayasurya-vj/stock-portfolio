import { MarketChangeChartComponent } from "../../shared/components/market-change-chart/market-change-chart.component";
import { StocksBuySellFormComponent } from "../../shared/components/stocks-buy-sell-form/stocks-buy-sell-form.component";
import { TransactionsTableComponent } from "../../shared/components/transactions-table/transactions-table.component";
import { ActionType } from "../models/portfolio.model";

export  const componentMapDefault= {
    stockFormBuy: {
      component:StocksBuySellFormComponent,
      inputs: { type: ActionType.Buy },
    },
    stockFormSell: {
      component:StocksBuySellFormComponent,
      inputs: { type: ActionType.Sell },
    },
    transactions: {
      component:TransactionsTableComponent,
      inputs: { transactionsDataList: [{}]},
    },
    dayMarketChange: {
      component:MarketChangeChartComponent,
      inputs: { type: "day"},
    },
    yearMarketChange: {
      component:MarketChangeChartComponent,
      inputs: { type: "year"},
    }
  }

  export const symbols = [ "AALB.NL" , "ABN.NL" , "ABN.NL" , "ADYEN.NL" , "AGN.NL" , "AD.NL" , "AKZA.NL" , "MT.NL" , "ASML.NL" , "ASRNL.NL" , "DSM.NL" , "GLPG.NL" , "HEIA.NL" , "IMCD.NL" , "INGA.NL" , "KPN.NL" , "NN.NL" , "PHIA.NL" , "RAND.NL" , "REN.NL" , "RDSA.NL" , "TKWY.NL" , "URW.NL" , "UNA.NL" , "VPK.NL" , "WKL.NL" , "AAPL.Q" , "AMZN.Q" , "FB.Q" , "MSFT.Q"];

