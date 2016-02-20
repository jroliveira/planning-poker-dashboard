import {Component, View} from 'angular2/core';
import {Card} from './../card/card';
import {User} from './../user/user';
import {Group} from './../group/group';
import {Match} from './match';
import {GroupComponent} from './../group/group.component';
import {SocketService} from './../core/socket-service';

@Component({
  selector: 'match'
})

@View({
  templateUrl: './app/match/match.component.html',
  directives: [
    GroupComponent
  ],
  providers: [
    SocketService
  ]
})

export class MatchComponent {
  private _socket: SocketIOClient.Socket;
  private _match: Match;
  
  get groups(): Group[] {
    return this._match.groups;
  }
  
  get users(): User[] {
    return this._match.users;
  }
  
  get room(): string {
    return this._match.room;
  }
  
  get connected(): boolean {
    return !!this._match;
  }
  
  get finished(): boolean {
    return this._match.finished;
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
    let card = new Card(data.points);
    this._match.revealCard(data.userId, card);
  };
}