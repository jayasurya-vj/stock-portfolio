import { Component, inject, OnInit, signal } from '@angular/core';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { PortfolioSummary } from '../../../core/models/portfolio.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'portfolio-summary',
  standalone: true,
  imports: [PercentPipe,  CurrencyPipe ],
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.css'
})
export class PortfolioSummaryComponent implements OnInit{

  private portfolioService = inject(PortfolioService);

  portfolioSummary = signal<PortfolioSummary | null>(null);

  ngOnInit() {
    this.portfolioService.getPortfolioSummary().subscribe(data=>{
      this.portfolioSummary.set(data);
    })
  }

}
