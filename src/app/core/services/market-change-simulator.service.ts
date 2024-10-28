import { Injectable } from '@angular/core';

export enum dataPoint {
  timestamp, open, high, low, close
}

@Injectable({
  providedIn: 'root'
})
export class MarketChangeSimulatorService {
  private yearArray:any[]= this.getTimestampArray();
  private dayArray:any[]= this.getTodayTimestampArray();

  constructor() {
  }

  isTimeGreaterThanMartketStartTime(){
    let today = new Date()
    let stockMarketOpenTime = new Date((new Date()).setHours(9,0,0,0));  

    return (stockMarketOpenTime).valueOf() < (today).valueOf();
  }

  getCandleStickChartDataFor1Year(initialData: number[]){
    return this.getCandleStickChartDataForYear(initialData,this.yearArray);

  }
  getCandleStickChartDataForToday(initialData: number[]){
    return this.getCandleStickChartDataForDay(initialData,this.dayArray);
    
  }

  private getCandleStickChartDataForYear(initialData: number[],timeStampArray: number[], steps=timeStampArray.length) {
    let yearData = Array(steps).fill(Array(5))
    yearData[0] = [timeStampArray[0], ...initialData]

    for (let i = 1; i < steps; i++) {
      let highValue, lowValue, openValue;
      let closeValue = yearData[i - 1][1];

      let randomPercentageChange = this.getRandomNumber(1,13); //the stock price will not be zero as randomPercentageChange less than 100

      let { randomChange, changedValue } = this.getARandomValueCloserToANumber(-randomPercentageChange,randomPercentageChange, closeValue); //get daily change 



      if (changedValue > closeValue) {  //random Change is the high value
        highValue = changedValue;

        let newRandomNum1 = this.getARandomValueCloserToANumber(-1, -5, highValue);
        let newRandomNum2 = this.getARandomValueCloserToANumber(-1, -5, highValue);

        if(newRandomNum1.changedValue > newRandomNum2.changedValue){
          lowValue = newRandomNum2.changedValue;
          openValue = newRandomNum1.changedValue;
        }else{
          lowValue = newRandomNum1.changedValue;
          openValue = newRandomNum2.changedValue;
        }
        
        
      } else { //random Change is the low value
        lowValue = changedValue;

        let newRandomNum1 = this.getARandomValueCloserToANumber(1, 5, lowValue);
        let newRandomNum2 = this.getARandomValueCloserToANumber(1, 5, lowValue);

        if(newRandomNum1.changedValue < newRandomNum2.changedValue){
          highValue = newRandomNum2.changedValue;
          openValue = newRandomNum1.changedValue;
        }else{
          highValue = newRandomNum1.changedValue;
          openValue = newRandomNum2.changedValue;
        }
      }

    

      yearData[i] = [timeStampArray[i], openValue, highValue, lowValue, closeValue]

    }

    return yearData;

  }

  private getCandleStickChartDataForDay(initialData: number[],timeStampArray: number[], steps=timeStampArray.length) {
    let dayData = Array(steps).fill(Array(5))
    // yearData[0] = [timeStampArray[0], ...initialData]
    let dayOpen = initialData[0];
    let dayHigh =initialData[1];
    let dayLow =initialData[2];
    let dayClose =initialData[3]; 

    for (let i = 0; i < steps; i++) {
      let highValue, lowValue, closeValue;
      let openValue = i> 0 ? dayData[i - 1][4] : dayOpen;

     

      let changedValue= this.getRandomNumber(dayLow,dayHigh); //get daily change



      if (changedValue > openValue) {  //random Change is the high value
        highValue = changedValue;

        let newRandomNum1 = this.getRandomNumber(dayLow,highValue);
        let newRandomNum2 = this.getRandomNumber(dayLow,highValue);

        if(newRandomNum1 > newRandomNum2){
          lowValue = newRandomNum2;
          closeValue = newRandomNum1;
        }else{
          lowValue = newRandomNum1;
          closeValue = newRandomNum2;
        }
        
        
      } else { //random Change is the low value
        lowValue = changedValue;

        let newRandomNum1 = this.getRandomNumber(lowValue,dayHigh);
        let newRandomNum2 = this.getRandomNumber(lowValue,dayHigh);

        if(newRandomNum1 < newRandomNum2){
          highValue = newRandomNum2;
          closeValue = newRandomNum1;
        }else{
          highValue = newRandomNum1;
          closeValue = newRandomNum2;
        }
      }

    

      dayData[i] = [timeStampArray[i], openValue, highValue, lowValue, closeValue]

    }
    dayData[steps-1][4] = dayClose;

    return dayData;

  }

  private getARandomValueCloserToANumber(min: number, max: number, closerNum: number): { randomChange: number, changedValue: number } {

    let randomChange = this.getRandomNumber(max, min); 

    let changedValue = closerNum + ((randomChange / 100) * closerNum);
    return { randomChange, changedValue }
  }



  private getTimestamp(date: string | number | Date) {
    return Math.round(+new Date(date));
  }

  private getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  private getTimestampArray() {
    let dates = Array(400).fill(0)
    let startDate = new Date();
    dates = dates.map((ele, index) => this.getTimestamp(this.subtractDays(startDate, index)));
    return dates;
  }
  

  private getTodayTimestampArray() {
    let timeStamps;
    let today = new Date()
    let stockMarketEndTime = new Date((new Date()).setHours(15,0,0,0));  
    let endTime= ((stockMarketEndTime).valueOf() > (today).valueOf()) ?    (today):     stockMarketEndTime;
    let startTime = new Date((new Date()).setHours(9,0,0,0));


    var diff = Math.floor((endTime.getTime() - startTime.getTime())/(1000*60)); //converting milliseconds into minutes
    let steps = Math.floor(diff/5);
    (steps<0) && (steps = 1);
    
    timeStamps = Array(steps).fill(0).map((ele, index) => (this.getTimestamp(this.addMinutes(startTime, index*5))));
    return timeStamps;
  }

  private subtractDays(dateVal: string | number | Date, days: number) {
    const date = new Date(dateVal);
    date.setDate(date.getDate() - days);
    return date;
  }

  private addMinutes(dateVal: string | number | Date, mins: number) {
    const date = new Date(dateVal);
    date.setMinutes(date.getMinutes() + mins);
    return date;
  }


  
}
