import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { componentMapDefault } from '../defaults/portfolio';
import { ComponentType } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalComponent= signal<ComponentType>(componentMapDefault.stockFormBuy);  
  showModal= signal(false);

  constructor() { }

  
}
