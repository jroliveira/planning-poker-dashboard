export class SocketService {
  private _socket;
  static instance: SocketService;
  static isCreating: Boolean = false;

  get socket(): any {
    return this._socket;
  }

  constructor() {
    if (!SocketService.isCreating) {
      throw new Error("You can't call new in Singleton instances!");
    }

    this._socket = io.connect('https://scrum-poker-api.herokuapp.com/');
  }

  static getInstance() {
    if (SocketService.instance == null) {
      SocketService.isCreating = true;
      SocketService.instance = new SocketService();
      SocketService.isCreating = false;
    }

    return SocketService.instance._socket;
  }
}
