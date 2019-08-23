import { Scene, Utilities, View } from ".";

export class CanvasUI {
  public static View = View;
  private scene: Scene;

  private settings: CanvasUI.CanvasUISettings = {
    hidpi: true,
    width: Utilities.windowDimensions.width,
    height: Utilities.windowDimensions.height
  };
  private nodeTree: CanvasUI.VirtualNode;
  public static instance: CanvasUI;

  constructor(
    canvas: HTMLCanvasElement = document.createElement("canvas"),
    settings: CanvasUI.CanvasUISettings = {}
  ) {
    if (!!CanvasUI.instance) {
      throw new Error("CanvasUI should only be instantiated once.");
    }

    // overwrite settings
    Object.assign(this.settings, settings);

    // create scene
    this.scene = new Scene(
      canvas,
      this.settings.width,
      this.settings.height,
      this.settings.hidpi
    );

    CanvasUI.instance = this;
    console.log(this);
  }

  public render(node: CanvasUI.VirtualNode = this.nodeTree): void {
    this.nodeTree = this.nodeTree || node;
    const canvas = this.scene.canvas;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawNodeTree(node);
  }

  private drawNodeTree(node: CanvasUI.VirtualNode): void {
    node.view.calculateLayout();
    node.view.onLayout(this.scene.canvas);
    node.view.draw(this.scene.canvas);
    node.children.forEach(child => {
      this.drawNodeTree(child);
    });
  }

  public static createVirtualNode<P = {}>(
    ViewClass: new (attributes: P, canvas: HTMLCanvasElement) => View<P>,
    attributes: P & CanvasUI.PositionAttributes,
    ...childNodes: CanvasUI.VirtualNode[]
  ): CanvasUI.VirtualNode {
    const viewInstance = new ViewClass(
      {
        ...(attributes || (View.defaultAttributes as any)),
        // flatten child nodes
        childNodes: childNodes.reduce((acc, val) => acc.concat(val), [])
      },
      CanvasUI.instance.scene.canvas
    );
    const render = viewInstance.render() || [];
    function setRelations(c: CanvasUI.VirtualNode): CanvasUI.VirtualNode {
      viewInstance.children.push(c.view as View);
      c.view.parent = viewInstance;
      return c;
    }

    const childArray = Array.isArray(render) ? render : [render];
    const children = childArray
      .filter(childNode => {
        const isNode = Utilities.isNode(childNode);
        if (!isNode)
          console.warn(
            `Child node is not a valid node. Got ${typeof childNode}`,
            childNode
          );
        return isNode;
      })
      .map(setRelations);

    viewInstance.children = children.map(c => c.view) as View[];

    const node: CanvasUI.VirtualNode = {
      view: viewInstance,
      children: children
    };

    return node;
  }
}
