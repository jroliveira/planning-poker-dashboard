import {Card} from './../card/card';

export class User {
  private _id: string;
  private _name: string;
  private _card: Card;
  private _plays: number = 0;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get card(): Card {
    return this._card;
  }
  
  get played(): boolean {
    return this._plays > 0;
  }
  
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  reveal(card: Card): void {
    this._plays++;
    this._card = card;
  }
  
  show(): void {
    this._plays = 0;
    this._card.show();
  }
  
  hide(): void {
    if (!this.played) {
      this._card = null;
    }
  }
}
