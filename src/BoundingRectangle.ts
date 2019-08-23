export class BoundingRectangle {
  private readonly rectangle: CanvasUI.Rectangle;

  constructor(
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0
  ) {
    this.rectangle = {
      x: x,
      y: y,
      width: width,
      height: height
    };
  }

  public get x(): number {
    return this.rectangle.x;
  }
  public get y(): number {
    return this.rectangle.y;
  }
  public get width(): number {
    return this.rectangle.width;
  }
  public get height(): number {
    return this.rectangle.height;
  }
}
