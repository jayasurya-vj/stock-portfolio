
import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { componentMapDefault } from '../defaults/portfolio';
import { ComponentType } from '../models/portfolio.model';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default modalComponent set to stockFormBuy', () => {
    expect(service.modalComponent()).toEqual(componentMapDefault.stockFormBuy);
  });

  it('should have showModal initialized to false', () => {
    expect(service.showModal()).toBe(false);
  });

  it('should update showModal signal', () => {
    service.showModal.set(true); 
    expect(service.showModal()).toBe(true); 

    service.showModal.set(false); 
    expect(service.showModal()).toBe(false); 
  });

  it('should update modalComponent signal', () => {
    const newComponent: ComponentType = {
      component: {},
      inputs: {} 
    };

    service.modalComponent.set(newComponent); 
    expect(service.modalComponent()).toEqual(newComponent); 
  });
});
