import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'assets-manager',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsManagerComponent implements OnInit {
  @Input() targetObj:any; // expecting {cssIcon:{css:"",color:""}} or {icon:{url:""}}
  @Output() onClose = new EventEmitter();
  @Output() onUse = new EventEmitter();
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
    search: '',
    fa: {
      css: "globe",
      color: "#0080ff"
    },
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

  filterAsset(itemArray) {
    if(this.assets.search) {
      return itemArray.filter(f=>f.indexOf(this.assets.search)>=0);
    } else {
      return itemArray;
    }
  }

  setActiveTab(name:string) {
    this.fileUrl = null;
    this.resetTabs();
    this.tabs[name].active = true;
  }

  resetFile() {
    this.fileUrl = "";
    this.error = false;
    this.invalid = false;
    this.fileToUpload = null;
  }

  setSelectedFile(file)  {
    let prefix = "/assets/images/";
    if(this.assets.selected === 'icon') {
      prefix += "icon/";
    } else if(this.assets.selected === 'upload') {
      prefix = "https://assets.thewan.ca/upload/";
    }
    this.fileUrl = prefix + file;
  }

  previewAsset() {
    return this.fileUrl || null;
  }

  closeAsset() {
    this.fileUrl = null;
  }

  showUse() {
    if(this.fileUrl || (this.tabs.fa.active && this.assets.fa.css)) {
      return true;
    } else {
      return false;
    }
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
      resp => {
      this.fileUrl = resp.url;
      this.uploading = false;
      this.fileToUpload = null;
      this.assets.upload.unshift(resp.filename);
    }, error=> {
      this.error = true;
      this.uploading = false;
    });
  }

  use() {
    if(this.tabs.fa.active) {
      this.onUse.emit(this.assets.fa);
    } else {
      this.onUse.emit({url:this.fileUrl});
    }
    this.close();
  }

  close() {
    this.utilityService.deleteCacheData('assets');
    this.fileUrl = null;
    this.onClose.emit();
  }
}
