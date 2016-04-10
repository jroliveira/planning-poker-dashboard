export class Card {
  private _points: string;
  private _shown: boolean;

  get value(): string {
    return this._points;
  }

  get shown(): boolean {
    return this._shown;
  }

  constructor(points: string) {
    this._points = points;
  }

  show(): void {
    this._shown = true;
  }
}
