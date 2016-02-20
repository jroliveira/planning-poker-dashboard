export class Card {
  private _value: string;
  private _shown: boolean;

  get value(): number {
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