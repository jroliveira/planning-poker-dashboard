import {Component} from 'angular2/core';
import {Group} from './group';
import {UserComponent} from './../user/user.component';

@Component({
  selector: 'group',
  inputs: ['group'],
  templateUrl: './app/group/group.component.html',
  directives: [
    UserComponent
  ]
})

export class GroupComponent {

}
