export class Card {
  private _points: number;

  get points(): number {
    return this._points;
  }

  constructor(points: number) {
    this._points = points;
  }
}