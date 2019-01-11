import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Item {
  id: string;
  name: string;
}

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent {

  createItem = '';
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  showLoginUserInputForm = false;
  showCreateUserInputForm = false;
  loginEmail = '';
  loginPassword = '';
  createEmail = '';
  createPassword = '';
  userEmail = '';
  userUiD = '';

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // When user is logged in on creation make sure to select values here
        this.userUiD = user.uid;
        this.itemsCollection = this.afs.collection<Item>('items-' + this.userUiD);
        this.items = this.itemsCollection.valueChanges();
        this.userEmail = this.afAuth.auth.currentUser.email;
        // when state changes occur show them in the console
        this.afs.collection('items-' + this.userUiD).auditTrail().subscribe(console.log);
      }
    });
  }

  addItem() {
    const name = this.createItem;
    const id = this.afs.createId();
    const item: Item = { id, name};
    this.itemsCollection.doc(id).set(item);
  }

  // async is not necessary here, but using it to control event loop
  async deleteItem(item: Item) {
    await this.itemsCollection.doc(item.id).delete()
      .catch(function(error) { alert(error); });
  }

  showLoginUserForm() {
    this.showLoginUserInputForm = true;
  }

  showCreateUserForm() {
    this.showCreateUserInputForm = true;
  }

  createUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.createEmail, this.createPassword)
      .then(
        function(success) {
          // on success hide create user input form and store variables in login
          // and then call the login method
          this.showCreateUserInputForm = false;
          this.loginEmail = this.createEmail;
          this.loginPassword = this.createPassword;
          this.createEmail = '';
          this.createPassword = '';
          this.loginUser();
        }.bind(this),
        function(error) {
          alert(error);
      });
  }

  loginUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then(
        function(success) {
          // on success populate user variables and then select grocery items for that user
          this.userUiD = success.user.uid;
          this.userEmail = success.user.email;
          this.loginEmail = '';
          this.loginPassword = '';
          this.showLoginUserInputForm = false;
          this.showCreateUserInputForm = false;
          this.selectItems();
        }.bind(this),
        function(error) {
          alert(error);
      });
  }

  selectItems() {
    this.itemsCollection = this.afs.collection<Item>('items-' + this.userUiD);
    this.items = this.itemsCollection.valueChanges();
    // when state changes occur show them in the console
    this.afs.collection('items-' + this.userUiD).auditTrail().subscribe(console.log);
  }

  // async is not necessary here, just controlling the event loop
  async logoutUser() {
    this.userEmail = '';
    this.userUiD = '';
    await this.afAuth.auth.signOut()
      .catch(function(error) { alert(error); });
  }

  cancelButton() {
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }
}
