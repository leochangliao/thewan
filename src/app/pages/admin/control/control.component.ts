import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'admin-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class AdminControlComponent implements OnInit {
  @Input() tab:any = {
    isSaving: false,
    isLoading: false,
    data: null
  };
  @Input() rawView:boolean;
  @Output() onToggle = new EventEmitter();
  @Output() onSave = new EventEmitter();
  isDemo = true;
  constructor(private utility:UtilityService) {}

  ngOnInit() {
    this.isDemo = this.utility.token === 'demo';
  }

  toggleView(isRaw:boolean) {
    this.rawView = isRaw;
    this.onToggle.emit(isRaw);
  }

  save(tab:any) {
    this.onSave.emit(tab);
  }
}
