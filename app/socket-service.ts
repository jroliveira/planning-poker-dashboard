import {Injectable} from 'angular2/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private _socket: SocketIOClient.Socket;

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  constructor() {
    this._socket = io.connect('http://scrum-poker-api.herokuapp.com:80/');
  }
}