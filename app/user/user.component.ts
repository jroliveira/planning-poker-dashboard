import {Component, View} from 'angular2/core';
import {User} from './user';
import {CardComponent} from './card/card.component';

@Component({
  selector: 'user',
  inputs: ['user']
})

@View({
  templateUrl: './app/user/user.html',
  styleUrls: [
    './app/user/user.css'
  ],
  directives: [
    CardComponent
  ]
})

export class UserComponent {
  user: User;
}