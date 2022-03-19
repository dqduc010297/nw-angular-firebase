import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { environment } from 'src/environments/environment';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  imports: [
    ItemRoutingModule,
    NgZorroAntdModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [ItemComponent],
  exports: [ItemComponent]
})
export class ItemModule { }
