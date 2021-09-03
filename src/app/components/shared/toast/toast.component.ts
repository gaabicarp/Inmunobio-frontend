import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastServiceService } from '../../../services/toast-service.service'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {

  constructor(public toastService: ToastServiceService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
  // `
  //   <ngb-toast
  //     *ngFor="let toast of toastService.toasts"
  //     [header]="toast.headertext"
  //     [class]="toast.classname"
  //     [autohide]="toast.autohide"
  //     [delay]="toast.delay || 5000"
  //     (hide)="toastService.remove(toast)"
  //   >
  //     <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
  //       <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
  //     </ng-template>

  //     <ng-template #text>{{ toast.textOrTpl }}</ng-template>
  //   </ngb-toast>
  // `
}
