import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output() onUpload = new EventEmitter();
  fileToUpload: File = null;
  fileUrl = "";
  invalid = false;
  error = false;
  uploading = false;
  maxFileSize = 99999;
  constructor(private utilityService:UtilityService) { }

  ngOnInit() {
  }

  resetFile() {
    this.fileUrl = "";
    this.error = false;
    this.invalid = false;
    this.fileToUpload = null;
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
