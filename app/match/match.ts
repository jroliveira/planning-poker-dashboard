export class Match {
  private _users: Users = {};
  private _current: number = 1;
  private _room: string;

  get users(): User[] {
    let users: User[] = [];
    
    for (let id in this._users) {
      let user = this._users[id];
      users.push(user);
    }
    
    return users;
  }
  
  get room(): string {
    return this._room;
  }
  
  constructor(room: string) {
    this._room = room;
  }
  
  addUser(user: User): void {
    this._users[user.id] = user;
  }
  
  removeUser(id: string): void {
    delete this._users[id];
  }
  
  revealCard(userId: string, points: number): void {
    let user = this._users[userId];
    user.reveal(points);
    
    let matchFinished = this.allPlayed();
    if (matchFinished) {      
      this.result();
      return;
    }
    
    let matchStarted = this.fistPlay();
    if (matchStarted) {      
      this.reset();
    }
  }
  
  private allPlayed(): boolean {
    for (let id in this._users) {
      let user = this._users[id];
      
      if (!user.played) {
        return false;
      }
    }
    
    return true;
  }
  
  private result(): void {
    this._current++;
    
    for (let id in this._users) {
      let user = this._users[id];
      user.show();
    }
  }
  
  private fistPlay(): boolean {
    let played: number = 0;
    
    for (let id in this._users) {
      let user = this._users[id];
      
      if (user.played) {
        played++;
      }
    }
    
    return played == 1;
  }
  
  private reset(): void {
    for (let id in this._users) {
      let user = this._users[id];
      user.hide();
    }
  }
}