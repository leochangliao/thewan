import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { AlertModal } from './alert/alert.component';
import { ConfirmModal } from './confirm/confirm.component';

@Injectable({providedIn: 'root'})
export class ModalService {
    constructor (config:NgbModalConfig, private ngbModal:NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    alert(title:string, message:string) {
        const modalRef = this.ngbModal.open(AlertModal);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
    }

    confirm(title:string, message:string) {
        const modalRef = this.ngbModal.open(ConfirmModal);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        return modalRef;
    }
}