import {Component, View} from 'angular2/core';
import {User} from './match/user/user';
import {MatchComponent} from './match/match.component';
import {LoginComponent} from './login/login.component';
import {SocketService} from './core/socket-service';

@Component({
  selector: 'app'
})

@View({
  templateUrl: './app/app.component.html',
  styleUrls: [
    './app/app.component.css'
  ],
  directives: [
    LoginComponent,
    MatchComponent
  ],
  providers: [
    SocketService
  ]
})

export class AppComponent {
  private _socket: SocketIOClient.Socket;

  connected: boolean;
  room: string = '';
  
  constructor(socketService: SocketService) {
    this._socket = socketService.socket;

    this._socket.on('joined', this.joined);
  }
  
  private joined = (data: any) => {
    this.connected = true;
    this.room = data.room;
  };
}