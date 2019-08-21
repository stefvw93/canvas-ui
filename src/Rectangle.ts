import { View } from "./View";

export abstract class Rectangle<
  C = KeyValueMap,
  P extends CanvasUI.RectangleProperties = CanvasUI.RectangleProperties
> extends View<C, P> {
  constructor(properties: C & P, canvas: HTMLCanvasElement) {
    super(properties, canvas);
    this.properties.fillColor = properties.fillColor || "rgb(0,255,0)";
  }

  draw(canvas: HTMLCanvasElement): void {
    const { x, y, width, height } = this.properties;
    const context = canvas.getContext("2d");
    context.save();
    context.fillStyle = this.properties.fillColor;
    context.fillRect(x, y, width, height);
    context.restore();
  }
}
