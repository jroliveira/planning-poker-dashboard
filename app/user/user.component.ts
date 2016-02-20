import {Component, View} from 'angular2/core';
import {User} from './user';
import {CardComponent} from './../card/card.component';

@Component({
  selector: 'user',
  inputs: ['user']
})

@View({
  templateUrl: './app/user/user.component.html',
  styleUrls: [
    './app/user/user.component.css'
  ],
  directives: [
    CardComponent
  ]
})

export class UserComponent {

}