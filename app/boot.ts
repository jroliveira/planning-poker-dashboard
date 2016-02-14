import "zone.js/dist/zone.min.js";
import "reflect-metadata";
import {bootstrap} from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {SocketService} from './socket-service';

bootstrap(AppComponent, [ 
  SocketService
]);
