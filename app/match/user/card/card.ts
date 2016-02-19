export class Card {
  private _points: number;
  private _shown: boolean;

  get points(): number {
    return this._points;
  }
  
  get shown(): boolean {
    return this._shown;
  }
  
  constructor(points: number) {
    this._points = points;
  }
  
  show(): void {
    this._shown = true;
  }
}