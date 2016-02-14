import {Component, View} from 'angular2/core';
import {Card} from './card';

@Component({
  selector: 'card',
  inputs: ['card']
})

@View({
  templateUrl: './app/user/card/card.html',
  styleUrls: [
    './app/user/card/card.css'
  ]
})

export class CardComponent {
  card: Card;
}