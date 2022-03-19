import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/service/data';
import { FirebaseService } from 'src/app/service/firebase.service';
import { Item } from '../../service/firebase.type';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  data: Item[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getData().subscribe(
      result => {
        this.data = [];
        result.forEach((storagedItem: any) => {
          this.data.push({
            id: storagedItem.payload.doc.id,
            image: storagedItem.payload.doc.data().image,
            price: storagedItem.payload.doc.data().price,
            quantity: storagedItem.payload.doc.data().quantity,
            title: storagedItem.payload.doc.data().title
          })
        });
      }
    );
  }

  buy(item: any) {
    item.quantity--;
    this.firebaseService.buy(item);
  }
}
