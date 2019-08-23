import { BoundingRectangle } from "./BoundingRectangle";

export abstract class View<
  A = {},
  P extends CanvasUI.ViewAttributes = CanvasUI.ViewAttributes
> {
  public static defaultAttributes = {
    layoutFlow: "horizontal"
  } as CanvasUI.ViewAttributes;

  public readonly attributes: A & P;
  public parent?: View = null;
  public children?: View[] = [];
  public boundingRectangle?: BoundingRectangle;
  public __DEBUG__ = false;

  public x: CanvasUI.PositionProperty;
  public y: CanvasUI.PositionProperty;
  public width: CanvasUI.PositionProperty;
  public height: CanvasUI.PositionProperty;

  constructor(
    attributes: A & P,
    defaultAttributes = View.defaultAttributes as P
  ) {
    this.attributes = {
      ...defaultAttributes,
      ...attributes
    };

    this.x = attributes.x;
    this.y = attributes.y;
    this.width = attributes.width;
    this.height = attributes.height;
  }

  private calculateRelativeSize(property: "width" | "height"): number {
    const hasParent = !!this.parent;
    const attribute = this.attributes[property];
    const ownSize = this[property];
    const hasFixedProperty = attribute !== undefined;
    const hasCalculatedProperty =
      typeof attribute === typeof ownSize && attribute !== ownSize;
    const doCalculateFlexSize = hasParent
      ? (this.parent.attributes.layoutFlow === "horizontal" &&
          property === "width") ||
        (this.parent.attributes.layoutFlow === "vertical" &&
          property === "height")
      : false && !hasFixedProperty;

    if (hasCalculatedProperty) {
      return this.getPositionPropertyValue(ownSize);
    }

    if (hasFixedProperty) {
      return this.getPositionPropertyValue(attribute);
    }

    if (hasParent && doCalculateFlexSize) {
      let remainingSpace = this.getPositionPropertyValue(this.parent[property]);

      const siblings = this.parent.children.filter(child => child !== this);
      const fixedSiblings = siblings.filter(sibling =>
        sibling.attributes.hasOwnProperty(property)
      );
      const flexSiblings = siblings.filter(
        sibling => !sibling.attributes.hasOwnProperty(property)
      );

      fixedSiblings.forEach(sibling => {
        const siblingProperty = this.getPositionPropertyValue(
          sibling[property]
        );
        remainingSpace -= siblingProperty;
      });

      const value = remainingSpace / (flexSiblings.length + 1);

      return value;
    }

    if (hasParent) {
      return this.getPositionPropertyValue(this.parent[property]);
    }

    return 0;
  }

  private calculateRelativePosition(axis: "x" | "y"): CanvasUI.Vector2 {
    const hasParent = !!this.parent;
    const attribute = this.attributes[axis];
    const ownPosition = this[axis];
    const hasFixedProperty = attribute !== undefined;
    const hasCalculatedProperty =
      // typeof attribute === typeof ownPosition &&
      attribute !== ownPosition;
    const doCalculateFlexPosition = hasParent
      ? (this.parent.attributes.layoutFlow === "horizontal" && axis === "x") ||
        (this.parent.attributes.layoutFlow === "vertical" && axis === "y")
      : false && !hasFixedProperty;
    const sizeProperty = axis === "x" ? "width" : "height";
    const oppositeAxis = axis === "x" ? "y" : "x";
    // if (this.__DEBUG__)
    //   console.log({
    //     hasParent,
    //     hasFixedProperty,
    //     doCalculateFlexPosition,
    //     sizeProperty
    //   });

    if (this.constructor.name === "TextChild" && axis === "x") {
      // console.log({
      //   [axis]: this.getPositionPropertyValue(attribute),
      //   [oppositeAxis]: this.getPositionPropertyValue(this.parent[oppositeAxis])
      // });
    }

    if (hasFixedProperty) {
      return {
        [axis]: this.getPositionPropertyValue(attribute),
        [oppositeAxis]: this.getPositionPropertyValue(this.parent[oppositeAxis])
      } as CanvasUI.Vector2;
    }

    if (hasParent && doCalculateFlexPosition) {
      let positionOnAxis = 0;
      let remainingSpace = this.getPositionPropertyValue(
        this.parent[sizeProperty]
      );
      const siblings = this.parent.children.filter(child => child !== this);
      const fixedSiblings = siblings.filter(
        sibling => sibling[sizeProperty] !== undefined
      );
      const ownChildIndex = this.parent.children.indexOf(this);
      const previousFixedSiblings = fixedSiblings.filter(
        sibling => this.parent.children.indexOf(sibling) < ownChildIndex
      );
      const nextFixedSiblings = fixedSiblings.filter(
        sibling => this.parent.children.indexOf(sibling) > ownChildIndex
      );

      previousFixedSiblings.forEach(sibling => {
        const siblingSize = this.getPositionPropertyValue(
          sibling[sizeProperty]
        );
        positionOnAxis += siblingSize;
        remainingSpace -= siblingSize;
      });

      nextFixedSiblings.forEach(sibling => {
        const siblingSize = this.getPositionPropertyValue(
          sibling[sizeProperty]
        );
        remainingSpace -= siblingSize;
      });

      // if (this.__DEBUG__) {
      //   console.log({ positionOnAxis, remainingSpace });
      // }

      const parentPosition = this.getPositionPropertyValue(this.parent[axis]);
      const relativePosition = positionOnAxis + parentPosition;

      return {
        [axis]: relativePosition,
        [oppositeAxis]: this.getPositionPropertyValue(this.parent[oppositeAxis])
      } as CanvasUI.Vector2;
    }

    if (hasCalculatedProperty) {
      return {
        [axis]: ownPosition,
        [oppositeAxis]: this[oppositeAxis]
      } as CanvasUI.Vector2;
    }

    if (hasParent)
      return {
        [axis]: this.getPositionPropertyValue(this.parent[axis]),
        [oppositeAxis]: this.getPositionPropertyValue(this.parent[oppositeAxis])
      } as CanvasUI.Vector2;

    return {
      x: 0,
      y: 0
    };
  }

  protected getPositionPropertyValue(
    property: CanvasUI.PositionProperty
  ): number {
    if (typeof property === "function") return property();
    return property;
  }

  public calculateLayout(): void {
    // KEEP THIS ORDER!!!
    const width = this.calculateRelativeSize("width");
    const height = this.calculateRelativeSize("height");
    const axis = this.parent
      ? this.parent.attributes.layoutFlow === "horizontal"
        ? "x"
        : "y"
      : "x";
    const position: CanvasUI.Vector2 = this.calculateRelativePosition(axis);
    const x = position.x;
    const y = position.y;

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.boundingRectangle = new BoundingRectangle(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  public onLayout(canvas?: HTMLCanvasElement): void {}
  public draw(canvas?: HTMLCanvasElement): void {}
  public render(): CanvasUI.UICanvasNode {
    return null;
  }
}
