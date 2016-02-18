import {Component, View} from 'angular2/core';
import {SocketService} from './../socket-service';

@Component({
  selector: 'login'
})

@View({
  templateUrl: './app/login/login.component.html',
  styleUrls: [
    './app/login/login.component.css'
  ],
  providers: [
    SocketService
  ]
})

export class LoginComponent {
  private _socket: SocketIOClient.Socket;
  room: string = '';

  constructor(socketService: SocketService) {
    this._socket = socketService.socket;
  }

  login(room: string) {
    this._socket.emit('join', { name: '', room: room });
  }
}