import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendService } from './backend.service';
import { ActionType, PortfolioStock, PortfolioSummary, Transaction } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private backend = inject(BackendService);
  private portfolioStockList: PortfolioStock[] = [];

  private portfolioSummaryBS$ = new BehaviorSubject<PortfolioSummary | null>(null);
  private portfolioSummary$ = this.portfolioSummaryBS$.asObservable();

  private portfolioStockBS$ = new BehaviorSubject<PortfolioStock[]>([]);
  private portfolioStocks$ = this.portfolioStockBS$.asObservable();

  constructor() {
    let localPortfolioString = window.localStorage.getItem('portfolioList');
    let localPortfolio = localPortfolioString && JSON.parse(localPortfolioString);

    if (localPortfolio && (typeof localPortfolio) === (typeof this.portfolioStockList) && localPortfolio.length > 0) {
      console.log("localPortfolio exists - ", localPortfolio);
      this.portfolioStockList = localPortfolio;
      this.portfolioStockBS$.next(this.portfolioStockList);
      this.calculatePortfolioSummary();
      this.getLiveValueOfPortFolio();
    }

  }

  getPortfolio() {
    return this.portfolioStocks$;
  }

  getPortfolioSummary() {
    return this.portfolioSummary$;
  }

  checkIfUSStock(symbol: string) {
    const USStocks = ["AAPL.Q", "AMZN.Q", "FB.Q", "MSFT.Q"];
    return USStocks.includes(symbol);
  }



  getLiveValueOfPortFolio() {
    let req = this.portfolioStockList.map(stock => stock.symbol);
    req.push("USDEUR.FXVWD");

    this.backend.getStockPriceDataArray(req).subscribe(response => {
      if (response.length >0 && response.length == req.length){
        let exchangeRate = response.pop();
      

        for(let i=0;i<response.length;i++){
          let data = response[i];
          let listInd = this.portfolioStockList.findIndex(stock=>stock.symbol==data.vwdKey);
          let portfolioStock = this.portfolioStockList[listInd];

          if (data.currency == "USD" && !!exchangeRate?.price) {
            data.price = data.price * exchangeRate.price;
            data.open = data.open * exchangeRate.price;
            data.high = data.high * exchangeRate.price;
            data.low = data.low * exchangeRate.price;
            data.close = data.close * exchangeRate.price;
          }

          portfolioStock.currentPrice = data.price;
          portfolioStock.currentValue = portfolioStock.noContracts * data.price;
          portfolioStock.currentDayPrices = {
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close
          };
          
          portfolioStock.totalBuyingValue = portfolioStock.totalBuyingValue || this.getTotalBuyingValue(portfolioStock);
          portfolioStock.yield = this.getYield(portfolioStock);
          portfolioStock.yieldPercentage = this.getYieldPercentage(portfolioStock.yield, portfolioStock.totalBuyingValue);

          this.portfolioStockList[listInd] = portfolioStock;
        }

        console.log("portfolioList current",this.portfolioStockList);
        localStorage.setItem('portfolioList', JSON.stringify(this.portfolioStockList));
        this.portfolioStockBS$.next(this.portfolioStockList);
        this.calculatePortfolioSummary();

      }})
  }


  buyStocks(symbol: string, noContracts: number, price: number) {

    let req = [symbol];

    if (this.checkIfUSStock(symbol)) {
      req.push("USDEUR.FXVWD");
    }
    this.backend.getStockPriceDataArray(req).subscribe(response => {
      console.log("buy stock details", response);

      let data = response[0];



      let transaction: Transaction = {
        type: ActionType.Buy,
        noContracts,
        pricePerContract: price * -1,
        totalValue: (price * -1) * noContracts
      }

      let priceInUSD = null;
      if (data.currency == "USD" && response.length > 1) {
        let exchangeRate = response[1].price;
        priceInUSD = data.price;
        data.price = data.price * exchangeRate;
        data.open = data.open * exchangeRate;
        data.high = data.high * exchangeRate;
        data.low = data.low * exchangeRate;
        data.close = data.close * exchangeRate;
      }

      let portfolioIndex = this.portfolioStockList.findIndex((stock) => stock.symbol == symbol);
      let portfolioStock: PortfolioStock | undefined;

      if (portfolioIndex >= 0) {

        portfolioStock = this.portfolioStockList[portfolioIndex];
        portfolioStock.currentPrice = data.price;
        portfolioStock.noContracts = +portfolioStock.noContracts + +noContracts;
        portfolioStock.buyValue = portfolioStock.buyValue + noContracts * price;
        portfolioStock.currentValue = portfolioStock.noContracts * data.price;
        portfolioStock.transactionsList = [transaction, ...portfolioStock.transactionsList]
        portfolioStock.currentDayPrices = {
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close
        };


        portfolioStock = this.getCalculatedPortfolioStockFields(portfolioStock, priceInUSD);
        this.portfolioStockList[portfolioIndex] = portfolioStock;

      } else {

        portfolioStock = {
          symbol: symbol,
          name: data.name,
          currentPrice: data.price,
          noContracts: noContracts,
          buyValue: noContracts * price,
          currentValue: noContracts * data.price,
          transactionsList: [transaction],
          currentDayPrices: {
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close
          }
        }




        portfolioStock = this.getCalculatedPortfolioStockFields(portfolioStock, priceInUSD);
        this.portfolioStockList.push(portfolioStock);

      }


 
      localStorage.setItem('portfolioList', JSON.stringify(this.portfolioStockList));
      this.portfolioStockBS$.next(this.portfolioStockList);
      this.calculatePortfolioSummary();
    });

  }



  sellStocks(symbol: string, noContracts: number, price: number) {
    let portfolioIndex = this.portfolioStockList.findIndex((stock) => stock.symbol == symbol);

    if (portfolioIndex < 0) return;

    let portfolioStock: PortfolioStock = this.portfolioStockList[portfolioIndex];

    if (portfolioStock.noContracts >= noContracts) {

      let req = [symbol];

      if (this.checkIfUSStock(symbol)) {
        req.push("USDEUR.FXVWD");
      }


      this.backend.getStockPriceDataArray(req).subscribe(response => {
        console.log("sell stock details", response);

        let data = response[0];

        let transaction: Transaction = {
          type: ActionType.Sell,
          noContracts,
          pricePerContract: price,
          totalValue: price * noContracts
        }

        let priceInUSD = null;
        if (data.currency == "USD" && response.length > 1) {
          let exchangeRate = response[1].price;
          priceInUSD = data.price;
          data.price = data.price * exchangeRate;
          data.open = data.open * exchangeRate;
          data.high = data.high * exchangeRate;
          data.low = data.low * exchangeRate;
          data.close = data.close * exchangeRate;
        }

        portfolioStock.currentPrice = data.price;
        portfolioStock.noContracts = +portfolioStock.noContracts - +noContracts;
        portfolioStock.currentValue = portfolioStock.noContracts * data.price;
        portfolioStock.transactionsList = [transaction, ...portfolioStock.transactionsList];
        portfolioStock.currentDayPrices = {
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close
        };



        portfolioStock = this.getCalculatedPortfolioStockFields(portfolioStock, priceInUSD);
        this.portfolioStockList[portfolioIndex] = portfolioStock;
        localStorage.setItem('portfolioList', JSON.stringify(this.portfolioStockList));
        this.portfolioStockBS$.next(this.portfolioStockList);

        this.calculatePortfolioSummary();
      })



    }


  }

  getCalculatedPortfolioStockFields(portfolioStock: PortfolioStock, priceInUSD?: number | null) {
    portfolioStock.totalContractsBought = this.getTotalContractsBoughts(portfolioStock);
    portfolioStock.totalContractsSold = this.getTotalContractsSold(portfolioStock);
    portfolioStock.totalBuyingValue = this.getTotalBuyingValue(portfolioStock);
    portfolioStock.avgBuyingValue = this.getAvgBuyingValueForAUnit(portfolioStock.totalBuyingValue, portfolioStock.totalContractsBought);

    portfolioStock.yield = this.getYield(portfolioStock);
    portfolioStock.yieldPercentage = this.getYieldPercentage(portfolioStock.yield, portfolioStock.totalBuyingValue);

    priceInUSD && (portfolioStock.currentPriceInUSD = priceInUSD);

    return portfolioStock;
  }

  getTotalBuyingValue(stock: PortfolioStock) {
    return -1 * stock.transactionsList.filter(transaction => transaction.type == ActionType.Buy).reduce((sum, transaction) => { return sum + transaction.totalValue }, 0);
  }

  getTotalContractsBoughts(stock: PortfolioStock) {
    return stock.transactionsList.filter(transaction => transaction.type == ActionType.Buy).reduce((sum, transaction) => { return sum + transaction.noContracts }, 0);
  }

  getTotalContractsSold(stock: PortfolioStock) {
    return stock.transactionsList.filter(transaction => transaction.type == ActionType.Sell).reduce((sum, transaction) => { return sum + transaction.noContracts }, 0);
  }

  getAvgBuyingValueForAUnit(totalBuyingValue: number, totalContractsBought: number) {
    return totalBuyingValue / totalContractsBought;
  }

  getYield(stock: PortfolioStock) {
    return (stock.noContracts * stock.currentPrice) + stock.transactionsList.reduce((sum, transaction) => { return sum + transaction.totalValue }, 0);
  }

  getYieldPercentage(totalYield: number, totalBuyingValue: number) {
    return totalYield / (totalBuyingValue);
  }

  calculatePortfolioSummary() {
    if (!this.portfolioStockList.length) return;

    let totalContractsBought = this.portfolioStockList.reduce((sum, stock) => (sum + (stock?.totalContractsBought || 0)), 0);
    let totalBuyingValue = this.portfolioStockList.reduce((sum, stock) => (sum + (stock?.totalBuyingValue || 0)), 0);
    let totalCurrentValue = this.portfolioStockList.reduce((sum, stock) => (sum + (stock?.currentValue || 0)), 0);
    let yieldVal = this.portfolioStockList.reduce((sum, stock) => (sum + (stock?.yield || 0)), 0);
    let yieldPercentage = this.getYieldPercentage(yieldVal, totalBuyingValue);

    let PortfolioSummary = { totalContractsBought, totalBuyingValue, totalCurrentValue, yield: yieldVal, yieldPercentage };

    this.portfolioSummaryBS$.next(PortfolioSummary);
  }


}
