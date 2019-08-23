declare namespace JSX {
  interface ElementAttributesProperty {
    attributes;
  }

  type IntrinsicElements = {
    [key: string]: any;
  };
}

type KeyValueMap = { [key: string]: any };

declare namespace CanvasUI {
  type Vector2 = { x: number; y: number };

  type FillStyle = string | CanvasGradient | CanvasPattern;

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

  type FunctionBasedValue = () => number;

  type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  type PositionProperty = number | FunctionBasedValue;

  type PositionAttributes = {
    x?: PositionProperty;
    y?: PositionProperty;
    width?: PositionProperty;
    height?: PositionProperty;
  };

  type LayoutAttributes = {
    layoutFlow?: "horizontal" | "vertical";
    relativePosition?: "parent" | "viewport";
  };

  type ViewAttributes = PositionAttributes &
    LayoutAttributes & {
      childNodes?: UICanvasNode;
    };

  type RectangleAttributes = ViewAttributes & {
    fillStyle?: FillStyle;
  };

  type TextAttributes = PositionAttributes & {
    direction?: CanvasDirection;
    fillStyle?: FillStyle;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    lineHeight?: number;
    text: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
  };

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
