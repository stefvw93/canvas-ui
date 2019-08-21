export abstract class View<
  C = KeyValueMap,
  P extends CanvasUI.BasePositionProperties = CanvasUI.BasePositionProperties
> {
  public static defaultProperties: CanvasUI.BasePositionProperties = {
    layoutFlow: "horizontal"
  };

  public readonly properties: C & P;
  public parent?: View = null;
  public children?: View[] = [];

  constructor(properties: C & P, canvas: HTMLCanvasElement) {
    console.log("View.constructor", { properties, canvas });
    this.properties = {
      ...View.defaultProperties,
      ...properties
    };
  }

  private calculateRelativePosition(property: "x" | "y"): number {
    const hasParent = !!this.parent;
    const hasProperty = this.properties.hasOwnProperty(property);
    const doCalculateFlexPosition = hasParent
      ? (this.parent.properties.layoutFlow === "horizontal" &&
          property === "x") ||
        (this.parent.properties.layoutFlow === "vertical" && property === "y")
      : false;
    const dimensionProperty = property === "x" ? "width" : "height";

    if (hasProperty) return this.properties[property];
    if (hasParent && doCalculateFlexPosition) {
      const childIndex = this.parent.children.indexOf(this);
      const childrenAmount = this.parent.children.length;
      let position = 0;
      const siblings = this.parent.children.filter(child => child !== this);
      const fixedSiblings = siblings.filter(child =>
        child.properties.hasOwnProperty(property)
      );
      const previousFixedSiblings = fixedSiblings.filter(
        sibling =>
          this.parent.children.indexOf(sibling) <
          this.parent.children.indexOf(this)
      );

      previousFixedSiblings.forEach(sibling => {
        position += sibling.properties[dimensionProperty];
      });

      const relativePosition = position + this.parent.properties[property];

      return relativePosition;
    }
    if (hasParent) return this.parent.properties[property];

    return 0;
  }

  private calculateRelativeDimension(property: "width" | "height"): number {
    const hasParent = !!this.parent;
    const hasProperty = this.properties.hasOwnProperty(property);
    const doCalculateFlexDimension = hasParent
      ? (this.parent.properties.layoutFlow === "horizontal" &&
          property === "width") ||
        (this.parent.properties.layoutFlow === "vertical" &&
          property === "height")
      : false;

    if (hasProperty) return this.properties[property];

    if (hasParent && doCalculateFlexDimension) {
      let remainingSpace = this.parent.properties[property];

      const siblings = this.parent.children.filter(child => child !== this);
      const fixedSiblings = siblings.filter(child =>
        child.properties.hasOwnProperty(property)
      );
      const flexSiblings = siblings.filter(
        child => !child.properties.hasOwnProperty(property)
      );

      fixedSiblings.forEach(sibling => {
        remainingSpace -= sibling.properties[property];
      });

      const flexSize = remainingSpace / (flexSiblings.length + 1);

      return flexSize;
    }

    if (hasParent) return this.parent.properties[property];
    return 0;
  }

  public calculateLayout(): void {
    // KEEP THIS ORDER!!!
    this.properties.width = this.calculateRelativeDimension("width");
    this.properties.height = this.calculateRelativeDimension("height");
    this.properties.x = this.calculateRelativePosition("x");
    this.properties.y = this.calculateRelativePosition("y");
  }

  public draw(canvas?: HTMLCanvasElement): void {}
  public render(): CanvasUI.UICanvasNode {
    return null;
  }
}
