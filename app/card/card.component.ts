import {Component} from 'angular2/core';
import {Card} from './card';

@Component({
  selector: 'card',
  inputs: ['card'],
  templateUrl: './app/card/card.component.html',
  styleUrls: [
    './app/card/card.component.css'
  ]
})

export class CardComponent {

}
