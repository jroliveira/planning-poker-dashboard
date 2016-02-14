import {Component, View} from 'angular2/core';
import {User} from './user/user';
import {Users} from './user/users';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {SocketService} from './socket-service';

@Component({
  selector: 'app'
})

@View({
  templateUrl: './app/app.html',
  styleUrls: [
    './app/app.css'
  ],
  directives: [
    UserComponent, 
    LoginComponent
  ],
  providers: [
    SocketService
  ]
})

export class AppComponent {
  private _socket: SocketIOClient.Socket;
  private _users: Users = {};

  connected: boolean;
  room: string = '';
  
  get users(): User[] {
    return Object.keys(this._users);
  }
  
  constructor(socketService: SocketService) {
    this._socket = socketService.socket;

    this._socket.on('joined', this.joined);
    this._socket.on('user:joined', this.userJoined);
    this._socket.on('user:left', this.userLeft);
    this._socket.on('card:revealed', this.cardRevealed);
  }
  
  private joined = (data: any) => {
    this.connected = true;
    this.room = data.room;
    this._users = [];

    data.users.forEach((item) => {
      var user = new User(item.id, item.name);
      this._users[user.id] = user;
    });
  };
  
  private userJoined = (data: any) => {
    var user = new User(data.id, data.name);
    this._users[user.id] = user;
  };

  private userLeft = (data: any) => {
    delete this._users[data.id];
  };

  private cardRevealed = (data: any) => {
    var user = this._users[data.userId];
    user.reveal(data.points);
  };
  
  getUser(id: string): User {
    return this._users[id];
  }
}