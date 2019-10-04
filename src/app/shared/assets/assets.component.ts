import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'assets-manager',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsManagerComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onUpload = new EventEmitter();
  fileToUpload: File = null;
  fileUrl = "";
  invalid = false;
  error = false;
  uploading = false;
  maxFileSize = 99999;
  tabs = {
    asset: {
      name: "Assets",
      active: true
    },
    fa: {
      name: "Font Awesome",
      active: false
    },
    upload: {
      name: "Upload",
      active: false
    }
  }
  assets = {
    selected: 'icon',
    icon: [],
    image: [],
    upload: []
  };
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
    this.utilityService.getAssets().subscribe(
      resp => {
        this.assets.icon = Object.values(resp.asset.icon);
        this.assets.image = Object.values(resp.asset.image);
        this.assets.upload = Object.values(resp.upload);
      }
    );
  }

  private resetTabs() {
    for(let key in this.tabs) {
      this.tabs[key].active = false;
    }
  }

  setActiveTab(name:string) {
    this.resetTabs();
    this.tabs[name].active = true;
  }

  resetFile() {
    this.fileUrl = "";
    this.error = false;
    this.invalid = false;
    this.fileToUpload = null;
  }

  previewAsset() {
    return "http://localhost:4200/assets/images/icon/rbc.PNG";
  }

  onUploadFile(files: FileList) {
    this.resetFile();
    if(files.item && files.item(0)) {
      const file = files.item(0);
      const type = file.type.split("/")[0];
      if(type === "image" && file.size <= this.maxFileSize) {
        this.fileToUpload =  files.item(0);
      } else {
        this.invalid = true;
      }
    }
  }

  uploadFile() {
    this.uploading = true;
    this.utilityService.uploadFile(this.fileToUpload).subscribe(
      resp=> {
      this.fileUrl = resp;
      this.uploading = false;
      this.fileToUpload = null;
    }, error=> {
      this.error = true;
      this.uploading = false;
    });
  }

  use() {
    this.onUpload.emit(this.fileUrl);
    this.close();
  }

  close() {
    this.onClose.emit();
  }
}
