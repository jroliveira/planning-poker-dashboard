import {Component, View} from 'angular2/core';
import {User} from './user/user';
import {Users} from './user/users';
import {Match} from './match';
import {UserComponent} from './user/user.component';
import {SocketService} from './../core/socket-service';

@Component({
  selector: 'match'
})

@View({
  templateUrl: './app/match/match.component.html',
  styleUrls: [
    './app/match/match.component.css'
  ],
  directives: [
    UserComponent
  ],
  providers: [
    SocketService
  ]
})

export class MatchComponent {
  private _socket: SocketIOClient.Socket;
  private _match: Match;
  
  get users(): User[] {
    return this._match.users;
  }
  
  get room(): string {
    return this._match.room;
  }
  
  get connected(): boolean {
    return !!this._match;
  }
  
  constructor(socketService: SocketService) {
    this._socket = socketService.socket;

    this._socket.on('joined', this.joined);
    this._socket.on('user:joined', this.userJoined);
    this._socket.on('user:left', this.userLeft);
    this._socket.on('card:revealed', this.cardRevealed);
  }
  
  private joined = (data: any) => {
    this._match = new Match(data.room);

    data.users.forEach((item) => {
      let user = new User(item.id, item.name);
      this._match.addUser(user);
    });
  };
  
  private userJoined = (data: any) => {
    let user = new User(data.id, data.name);
    this._match.addUser(user);
  };

  private userLeft = (data: any) => {
    this._match.removeUser(data.id);
  };

  private cardRevealed = (data: any) => {
    this._match.revealCard(data.userId, data.points);
  };
}