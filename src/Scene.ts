import { Utilities } from ".";

export class Scene {
  public canvas: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    hidpi: boolean = true
  ) {
    // canvas ref
    this.canvas = canvas;

    // set up canvas
    this.setup(canvas, width, height, hidpi);
  }

  setup(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    hidpi: boolean
  ): void {
    const context = canvas.getContext("2d");
    const renderWidth = hidpi ? width * Utilities.devicePixelRatio : width;
    const renderHeight = hidpi ? height * Utilities.devicePixelRatio : height;
    const dpr = Utilities.devicePixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = renderWidth;
    canvas.height = renderHeight;
    if (hidpi) {
      context.scale(dpr, dpr);
    }

    if (!canvas.parentElement) {
      document.body.appendChild(canvas);
    }
  }

  public get context2d(): CanvasRenderingContext2D {
    if (!this.canvas) throw new Error("canvas has not been set");
    return this.canvas.getContext("2d");
  }

  public get contextWebGL(): WebGLRenderingContext {
    if (!this.canvas) throw new Error("canvas has not been set");
    return this.canvas.getContext("webgl");
  }
}
