import {Component, View} from 'angular2/core';
import {User} from './user';
import {CardComponent} from './card/card.component';

@Component({
  selector: 'user',
  inputs: ['user']
})

@View({
  templateUrl: './app/match/user/user.component.html',
  styleUrls: [
    './app/match/user/user.component.css'
  ],
  directives: [
    CardComponent
  ]
})

export class UserComponent {
  user: User;
}