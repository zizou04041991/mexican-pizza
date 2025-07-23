// src/app/components/modal/modal.service.ts
import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Modal } from '../components/modal/modal';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalServices {
private modalComponentRef: ComponentRef<Modal> | null = null;
  private resultSubject = new Subject<any>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(
    component: unknown, 
    inputs?: Record<string, unknown>, 
    options?: {
      title?: string;
      width?: string;
      maxWidth?: string;
      height?: string;
      maxHeight?: string;
    }
  ): Promise<any> {
    this.close();

    this.modalComponentRef = createComponent(Modal, {
      environmentInjector: this.injector
    });

    // Configuración del modal
    this.modalComponentRef.instance.childComponent = component;
    this.modalComponentRef.instance.inputs = inputs || {};
    this.modalComponentRef.instance.modalService = this;
    this.modalComponentRef.instance.title = options?.title || '';
    this.modalComponentRef.instance.modalWidth = options?.width || '80vw';
    this.modalComponentRef.instance.modalMaxWidth = options?.maxWidth || '1200px';
    this.modalComponentRef.instance.modalHeight = options?.height || 'auto';
    this.modalComponentRef.instance.modalMaxHeight = options?.maxHeight || '90vh';

    document.body.appendChild(this.modalComponentRef.location.nativeElement);
    this.appRef.attachView(this.modalComponentRef.hostView);
    document.body.style.overflow = 'hidden';

    // Retornamos una Promise que se resolverá con los datos cuando se cierre el modal
    return new Promise((resolve) => {
      const subscription = this.resultSubject.subscribe((result) => {
        resolve(result);
        subscription.unsubscribe();
      });
    });
  }

  closeWithResult(result?: any): void {
    if (this.modalComponentRef) {
      this.resultSubject.next(result);
      this.close();
    }
  }

  private close(): void {
    if (this.modalComponentRef) {
      this.modalComponentRef.instance.startCloseAnimation();
      setTimeout(() => {
        this.appRef.detachView(this.modalComponentRef!.hostView);
        this.modalComponentRef!.destroy();
        this.modalComponentRef = null;
        document.body.style.overflow = '';
      }, 300);
    }
  }
}