import {Component} from 'angular2/core';
import {Card} from './../card/card';
import {User} from './../user/user';
import {Group} from './../group/group';
import {Match} from './match';
import {GroupComponent} from './../group/group.component';
import {SocketService} from './../core/socket-service';

@Component({
  selector: 'match',
  templateUrl: './app/match/match.component.html',
  styleUrls: [
    './app/match/match.component.css'
  ],
  directives: [
    GroupComponent
  ]
})

export class MatchComponent {
  private _socket: any;
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

  get current(): number{
    return this._match.current;
  }

  get connected(): boolean {
    return !!this._match;
  }

  get finished(): boolean {
    return this._match.finished;
  }

  constructor() {
    this._socket = SocketService.getInstance();

    this._socket.on('joined', this.joined);
    this._socket.on('user:joined', this.userJoined);
    this._socket.on('user:left', this.userLeft);
    this._socket.on('card:revealed', this.cardRevealed);
  }

  private joined = (data: any) => {
    this._match = new Match(data.room);

    for (let id in data.users) {
        if (data.users.hasOwnProperty(id)) {
           let user = new User(id, data.users[id].name);
           this._match.addUser(user);
        }
    }
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
