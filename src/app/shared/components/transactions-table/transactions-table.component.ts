import { Component, input } from '@angular/core';
import { Transaction } from '../../../core/models/portfolio.model';
import {    CurrencyPipe  } from '@angular/common';

@Component({
  selector: 'transactions-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent {

    transactionsDataList = input<Transaction[]>([]);
    transactionsTableHeaders = ["Action Type",  "Number of contracts", "Price per unit", "Total Price"];
}
