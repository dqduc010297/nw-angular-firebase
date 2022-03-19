import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { Data } from "./data";
import { Item } from "./firebase.type";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore: AngularFirestore,) { }


    initData() {
        Data.forEach(p => {
            this.firestore.collection('Item').add(p);
        });
    }

    getData(): Observable<any> {
        return this.firestore.collection('Item').snapshotChanges();
    }

    addItem(item: Item) {
        return this.firestore.collection('Item').add(item);
    }

    buy(item: Item) {
        return this.firestore.collection('Item').doc(item.id).update(item);
    }
}