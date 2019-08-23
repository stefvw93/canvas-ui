export abstract class View<
  A = {},
  P extends CanvasUI.ViewAttributes = CanvasUI.ViewAttributes
> {
  public static defaultAttributes = {
    layoutFlow: "horizontal",
    relativePosition: "parent"
  } as CanvasUI.ViewAttributes;

  public readonly attributes: A & P;
  public parent?: View;
  public children?: View[] = [];
  public __DEBUG__ = false;

  protected position: Partial<CanvasUI.Rectangle> = {};

  constructor(
    attributes: A & P,
    defaultAttributes = View.defaultAttributes as P
  ) {
    this.attributes = {
      ...defaultAttributes,
      ...attributes
    };

    const { x, y, width, height } = this.attributes;

    this.position.x = this.getPositionPropertyValue(x);
    this.position.y = this.getPositionPropertyValue(y);
    this.position.width = this.getPositionPropertyValue(width);
    this.position.height = this.getPositionPropertyValue(height);
  }

  public get x(): number {
    return this.calculatePosition("x");
  }

  public set x(x: number) {
    this.position.x = x;
  }

  public get y(): number {
    return this.calculatePosition("y");
  }

  public set y(y: number) {
    this.position.y = y;
  }

  public get width(): number {
    return Math.max(0, this.calculateSize("width"));
  }

  public set width(width: number) {
    this.position.width = width;
  }

  public get height(): number {
    return Math.max(0, this.calculateSize("height"));
  }

  public set height(height: number) {
    this.position.height = height;
  }

  private calculatePosition(axis: "x" | "y"): number {
    const position = this.position[axis];
    const isDefined = position !== undefined;
    const { relativePosition } = this.attributes;
    const parent = this.parent;
    const hasParent = parent !== undefined;
    const sizeProperty = axis === "x" ? "width" : "height";
    const layoutFlow = hasParent ? parent.attributes.layoutFlow : undefined;

    // if position was defined
    if (isDefined) {
      // if the view is positioned relative to the viewport, return position
      if (relativePosition === "viewport") return position;

      // if the view is positioned relative to it's parent, calculate relative position
      if (relativePosition === "parent" && hasParent) {
        return position + parent[axis];
      }

      // if the view has no parent, relate to the viewport
      return position;
    }

    // if position was not defined
    if (!isDefined) {
      // if the view is positioned relative to the viewport, return 0
      if (relativePosition === "viewport") return 0;

      // if the view is positioned relative to it's parent
      if (relativePosition === "parent" && hasParent) {
        // if this view is the parent's only child
        if (parent.children.length === 1) return parent[axis];

        if (
          (layoutFlow === "horizontal" && axis === "y") ||
          (layoutFlow == "vertical" && axis === "x")
        ) {
          return parent[axis];
        }

        // if the axis is related to the parent's layout flow, add precedent siblings' size to offset
        if (
          (layoutFlow === "horizontal" && axis === "x") ||
          (layoutFlow == "vertical" && axis === "y")
        ) {
          let offset = parent[axis];
          const viewIndex = parent.children.indexOf(this);
          for (let child of parent.children) {
            if (parent.children.indexOf(child) < viewIndex) {
              offset += child[sizeProperty];
            }
          }

          return offset;
        }
      }

      // if the view has no parent, relate to the viewport
      return 0;
    }
  }

  private calculateSize(dimension: "width" | "height"): number {
    const size = this.position[dimension];
    const isDefined = size !== undefined;
    const { relativePosition } = this.attributes;
    const parent = this.parent;
    const hasParent = this.parent !== undefined;
    const layoutFlow = hasParent ? parent.attributes.layoutFlow : undefined;

    // if size is defined
    if (isDefined) {
      return size;
    }

    // if size is not defined
    if (!isDefined) {
      // if the view's size is relative to the viewport, return 0
      if (relativePosition === "viewport") return 0;

      // if the view's size is relative to it's parent
      if (relativePosition === "parent" && hasParent) {
        // if this view is the parent's only child
        if (parent.children.length === 1) return parent[dimension];

        if (
          (layoutFlow === "horizontal" && dimension === "height") ||
          (layoutFlow == "vertical" && dimension === "width")
        ) {
          return parent[dimension];
        }

        if (
          (layoutFlow === "horizontal" && dimension === "width") ||
          (layoutFlow == "vertical" && dimension === "height")
        ) {
          // calculate space left after fixed siblings' total size
          let remainingSpace = parent[dimension];
          let flexChildrenAmount = 1;
          const viewIndex = parent.children.indexOf(this);
          for (let child of parent.children) {
            const siblingIndex = parent.children.indexOf(child);
            const childSize = child.attributes[dimension];

            // if siblings size is defined
            if (siblingIndex !== viewIndex && childSize !== undefined) {
              remainingSpace -= this.getPositionPropertyValue(childSize);
            }

            // if sibling's size is not defined
            if (siblingIndex !== viewIndex && childSize === undefined) {
              flexChildrenAmount++;
            }
          }

          // calculate size by deviding the remaining space by the "flex" children
          const size = remainingSpace / flexChildrenAmount;

          return size;
        }
      }
    }

    return 0;
  }

  protected getPositionPropertyValue(
    property: CanvasUI.PositionProperty
  ): number | undefined {
    if (typeof property === "function") return property();
    return property;
  }

  public draw(canvas?: HTMLCanvasElement): void {}
  public viewDidDraw(canvas?: HTMLCanvasElement): void {}
  public render(): CanvasUI.UICanvasNode {
    return null;
  }
}
