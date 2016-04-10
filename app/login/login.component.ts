import {Component} from 'angular2/core';
import {SocketService} from './../core/socket-service';

@Component({
  selector: 'login',
  templateUrl: './app/login/login.component.html',
  styleUrls: [
    './app/login/login.component.css'
  ]
})

export class LoginComponent {
  private _socket: any;
  room: string = '';

  constructor() {
    this._socket = SocketService.getInstance();
  }

  login(room: string) {
    this._socket.emit('join', { name: '', room: room });
  }
}
