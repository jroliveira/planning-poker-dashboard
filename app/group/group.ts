import {User} from './../user/user';

interface Users {
  [id: string]: User;
}

export class Group {
  private _id: string;
  private _users: Users = {};
  
  get id(): string {
    return this._id;
  }
  
  get users(): User[] {
    let users: User[] = [];
    
    for (let userId in this._users) {
      let user = this._users[userId];
      users.push(user);
    }
    
    return users;
  }
  
  constructor(id: string) {
    this._id = id;
  }
  
  addUser(user: User): void {
    this._users[user.id] = user;
  }
  
  removeUser(userId: string): void {
    if !(this.getUser(userId)) {
      return;
    }
    
    delete this._users[userId];
  }
  
  getUser(userId: string): User {
    if !(userId in this._users) {
      return null;
    }
    
    return this._users[userId];
  }
  
  showCards(): void {
    for (let userId in this._users) {
      let user = this._users[userId];
      user.show();
    }
  }
  
  hideCards(): void {
    for (let userId in this._users) {
      let user = this._users[userId];
      user.hide();
    }
  }
}