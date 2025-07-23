import {
  Component,
  Input,
  ViewContainerRef,
  ComponentRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  EnvironmentInjector,
  createComponent,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalServices } from '../../services/modal-services';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements AfterViewInit, OnDestroy {
  childComponent: unknown;
  inputs: Record<string, unknown> = {};
  modalService!: ModalServices;
  title = '';
  modalWidth = '80vw';
  modalMaxWidth = '1200px';
  modalHeight = 'auto';
  modalMaxHeight = '90vh';
  
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent!: ViewContainerRef;
  
  isClosing = false;
  private childComponentRef: ComponentRef<unknown> | null = null;
  private injector = inject(EnvironmentInjector);

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.childComponent && this.modalContent) {
        this.loadChildComponent();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyChildComponent();
  }

  startCloseAnimation(): void {
    this.isClosing = true;
  }

  closeModal(): void {
    if (this.modalService) {
      this.modalService.closeWithResult(); // Cierra sin retornar datos
    }
  }

  private loadChildComponent(): void {
    this.destroyChildComponent();
    
    if (!this.childComponent || !this.modalContent) return;
    
    this.childComponentRef = createComponent(this.childComponent as any, {
      environmentInjector: this.injector
    });
    
    // Pasamos el modalService al componente hijo para que pueda cerrar el modal con resultado
    (this.childComponentRef.instance as any).modalService = this.modalService;
    
    Object.keys(this.inputs).forEach(key => {
      if (this.childComponentRef && this.inputs[key] !== undefined) {
        (this.childComponentRef as any).setInput(key, this.inputs[key]);
      }
    });
    
    this.modalContent.insert(this.childComponentRef.hostView);
  }

  private destroyChildComponent(): void {
    this.childComponentRef?.destroy();
    this.childComponentRef = null;
  }
}