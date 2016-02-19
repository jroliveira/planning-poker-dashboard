import {Component, View} from 'angular2/core';
import {Card} from './card';

@Component({
  selector: 'card',
  inputs: ['card']
})

@View({
  templateUrl: './app/match/user/card/card.component.html',
  styleUrls: [
    './app/match/user/card/card.component.css'
  ]
})

export class CardComponent {
  card: Card;
}