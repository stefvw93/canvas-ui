declare namespace JSX {
  interface ElementAttributesProperty {
    properties;
  }

  type IntrinsicElements = {
    [key: string]: any;
  };
}

type KeyValueMap = { [key: string]: any };

declare namespace CanvasUI {
  type BasePositionProperties = {
    layoutFlow?: "horizontal" | "vertical";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };

  type RectangleProperties = BasePositionProperties & {
    fillColor?: string | CanvasGradient | CanvasPattern;
  };

  type CanvasUISettings = {
    hidpi?: boolean;
    width?: number;
    height?: number;
  };

  type VirtualNode = {
    view: import("./View").View;
    children: VirtualNode[];
  };

  type UICanvasNode = VirtualNode | VirtualNode[] | null;

  class SceneClass {
    canvas: HTMLCanvasElement;
    protected setup(
      canvas: HTMLCanvasElement,
      width: number,
      height: number,
      hidpi: boolean
    ): void;
    public context2d: CanvasRenderingContext2D;
    public contextWebGL: WebGLRenderingContext;
  }
}
