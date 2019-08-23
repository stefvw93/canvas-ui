import { View } from "./View";

export abstract class Rectangle<
  A = {},
  P extends CanvasUI.RectangleAttributes = CanvasUI.RectangleAttributes
> extends View<A, P> {
  constructor(attributes: A & P) {
    super(attributes);
    if (this.__DEBUG__) {
      this.attributes.fillStyle = attributes.fillStyle || "rgb(0,255,0)";
    }
  }

  draw(canvas: HTMLCanvasElement): void {
    const { x, y, width, height } = this.boundingRectangle;
    const context = canvas.getContext("2d");
    context.save();
    context.fillStyle = this.attributes.fillStyle;
    context.fillRect(x, y, width, height);
    context.restore();
  }
}
