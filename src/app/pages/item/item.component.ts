import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  loading = false;
  avatarUrl?: string;
  task: any;
  form!: FormGroup;
  uploadPercent!: Observable<number>;

  get uploadedImage(): string {
    return this.form.controls['image'].value;
  }

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['Nhẫn Kim tiền Vàng Ý 18K PNJ 0000Y001917', [Validators.required]],
      price: [2832000, [Validators.required]],
      quantity: [10, Validators.required],
      image: [''],
    });
  }

  uploadImage(files: any) {
    if (files.length > 1 || files.length < 0) {
      alert('Please only drag your desired photo.');
      return;
    }
    const file = files[0];
    const path = `${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.uploadPercent = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        var downloadURL = ref.getDownloadURL()
        downloadURL.subscribe(url => {
          this.form.controls['image'].setValue(url);
        });
      })
    ).subscribe();
  }

  submitForm(): void {
    if (this.form.valid) {
      const newItem = this.form.getRawValue();
      this.firebaseService.addItem(newItem);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
