import {Card} from './card/card';

export class User {
  private _id: string;
  private _name: string;
  private _card: Card;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get card(): Card {
    return this._card;
  }

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  reveal(points: number) {
    const card = new Card(points);
    this._card = card;
  }
}
