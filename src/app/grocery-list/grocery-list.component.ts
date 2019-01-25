import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GroceryItem } from 'src/models/grocery-item';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent {

  createItem = '';
  showLoginUserInputForm = false;
  showCreateUserInputForm = false;
  loginEmail = '';
  loginPassword = '';
  createEmail = '';
  createPassword = '';
  userEmail = '';
  // create doc of type Item that represents the individual GroceryItems nested collection
  groceryItemsDoc: AngularFirestoreDocument<Item>;
  groceryItems: Observable<GroceryItem[]>;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // when logged in show user email here
        this.userEmail = user.email;
        // call method that selects all items when user is authenticated
        this.selectItems(user.uid);
      }
    });
  }

  // async is not necessary here, but using it to control event loop
  async addItem() {
    const id = this.afs.createId();
    const groceryItem: GroceryItem = {
      value: this.createItem,
      id: id
    };

    this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').doc(id).set(groceryItem)
      .then(
        function(success) {
          // when successful clear input field value here
          this.createItem = '';
        }.bind(this),
        function(error) {
          alert(error);
        }
      );
  }

  // async is not necessary here, but using it to control event loop
  async deleteItem(groceryItem: GroceryItem) {
    this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').doc(groceryItem.id).delete()
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
          this.userEmail = this.afAuth.auth.currentUser.email;
          this.selectItems(this.afAuth.auth.currentUser.uid);
        }.bind(this),
        function(error) {
          alert(error);
      });
  }

  selectItems(uid: string) {
    this.groceryItemsDoc = this.afs.doc<Item>('user/' + uid);
    this.groceryItems = this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').valueChanges();
    // turn on logging if you want to see how the requests are sent
    this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').auditTrail().subscribe(console.log);
  }

  // async is not necessary here, just controlling the event loop
  async logoutUser() {
    await this.afAuth.auth.signOut()
      .catch(function(error) { alert(error); });
  }

  cancelButton() {
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }
}
