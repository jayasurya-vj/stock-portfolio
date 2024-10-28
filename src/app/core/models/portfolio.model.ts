
export interface PortfolioStock{
    symbol : string
    name : string
    currentPrice: number
    currentPriceInUSD?: number
    noContracts: number
    buyValue: number
    currentValue: number
    totalContractsBought?: number
    totalContractsSold?: number
    avgBuyingValue?: number
    totalBuyingValue?: number
    yield?: number
    yieldPercentage?: number
    transactionsList: Transaction[]
    currentDayPrices: CurrentDayPrices
}

export interface Transaction{
  type:ActionType
  noContracts: number
  pricePerContract: number
  totalValue: number 
}

export interface CurrentDayPrices{
  open: number
  high: number
  low: number
  close: number | null
}

export interface StockPriceDataResponse {
    vwdKey: string
    name: string
    isin: string
    currency: string
    price: number
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    previousClose: number
    previousCloseTime: string
  }
  export interface PortfolioSummary{
    totalContractsBought?: number
    totalBuyingValue?: number
    totalCurrentValue?:number
    yield?: number
    yieldPercentage?: number
  }

  export interface ComponentType{
    component: any 
    inputs: any
   }


export enum  ActionType { 
  Buy="Buy",
  Sell="Sell",
}

export enum  PortfolioOptions{ 
  Buy="Buy",
  Sell="Sell",
  Transactions="Transactions",
  DayMarketChange="Day Market Change",
  YearMarketChange="Year Market Change"
}

