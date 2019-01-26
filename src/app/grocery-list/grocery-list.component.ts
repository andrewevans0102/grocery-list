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
  email = '';
  password = '';
  // create doc of type Item that represents the individual GroceryItems nested collection
  groceryItemsDoc: AngularFirestoreDocument<Item>;
  groceryItems: Observable<GroceryItem[]>;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        // show email in welcome message
        this.email = user.email;
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

    await this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').doc(id).set(groceryItem)
      .then(() => {
          // when successful clear input field value here
          this.createItem = '';
      })
      .catch((error) => {
        alert(error);
      });
  }

  // async is not necessary here, but using it to control event loop
  async deleteItem(groceryItem: GroceryItem) {
    await this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').doc(groceryItem.id).delete()
      .catch((error) => { alert(error); });
  }

  showLoginUserForm() {
    this.showLoginUserInputForm = true;
  }

  showCreateUserForm() {
    this.showCreateUserInputForm = true;
  }

  createUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
          // on success hide create user input form and store variables in login
          // and then call the login method
          this.showCreateUserInputForm = false;
          this.loginUser(email, password);
      })
      .catch((error) => {
        alert(error);
      });
  }

  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // on success populate user variables and then select grocery items for that user
        this.selectItems(this.afAuth.auth.currentUser.uid);
      })
      .catch((error) => {
        alert(error);
      });
  }

  selectItems(uid: string) {
    this.groceryItemsDoc = this.afs.doc<Item>('user/' + uid);
    this.groceryItems = this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').valueChanges();
    // // turn on logging if you want to see how the requests are sent
    // this.groceryItemsDoc.collection<GroceryItem>('GroceryItems').auditTrail().subscribe(console.log);
  }

  // async is not necessary here, just controlling the event loop
  async logoutUser() {
    await this.afAuth.auth.signOut()
      .catch(function(error) { alert(error); });

    this.email = '';
    this.password = '';
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }

  cancelButton() {
    this.showLoginUserInputForm = false;
    this.showCreateUserInputForm = false;
  }

}
