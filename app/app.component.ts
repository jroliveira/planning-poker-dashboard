import {Component} from 'angular2/core';
import {MatchComponent} from './match/match.component';
import {LoginComponent} from './login/login.component';
import {SocketService} from './core/socket-service';

@Component({
  selector: 'app',
  templateUrl: './app/app.component.html',
  directives: [
    LoginComponent,
    MatchComponent
  ]
})

export class AppComponent {
  private _socket: any;

  connected: boolean;
  room: string = '';

  constructor() {
    this._socket = SocketService.getInstance();
    this._socket.on('joined', this.joined);
  }

  private joined = (data: any) => {
    this.connected = true;
    this.room = data.room;
  };
}
