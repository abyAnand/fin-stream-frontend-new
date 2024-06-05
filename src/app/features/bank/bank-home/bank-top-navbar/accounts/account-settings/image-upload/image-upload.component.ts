import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Output() imageSelected = new EventEmitter<File>();
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
  }

  submitImage() {
    if (this.selectedFile) {
      this.imageSelected.emit(this.selectedFile);
      this.activeModal.close();
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
