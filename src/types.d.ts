declare namespace JSX {
  interface ElementAttributesProperty {
    attributes;
  }
}

type KeyValueMap = { [key: string]: any };

declare namespace CanvasUI {
  type View = import("./View").View;
  type Vector2 = { x: number; y: number };

  type RelativePosition = "parent" | "viewport";

  type LayoutFlow = "horizontal" | "vertical";

  type LayoutAlignment =
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around";

  type FillStyle = string | CanvasGradient | CanvasPattern;

  type CanvasUISettings = {
    hidpi?: boolean;
    width?: number;
    height?: number;
  };

  type VirtualNode = {
    view: View;
    children: VirtualNode[];
  };

  type UICanvasNode = VirtualNode | VirtualNode[] | null;

  type FunctionBasedValue = (view?: View) => number;

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
    layoutAlignment?: LayoutAlignment;
    layoutFlow?: LayoutFlow;
    relativePosition?: RelativePosition;
  };

  type ViewAttributes = PositionAttributes &
    LayoutAttributes & {
      childNodes?: UICanvasNode;
    };

  type RectangleAttributes = ViewAttributes & {
    fillStyle?: FillStyle;
  };

  type TextAttributes = ViewAttributes & {
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
