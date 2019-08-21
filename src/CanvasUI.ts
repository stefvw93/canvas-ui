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

  public render(node: CanvasUI.VirtualNode): void {
    console.log("CanvasUI.render", { node });
    this.nodeTree = this.nodeTree || node;
    this.drawNodeTree(this.nodeTree);
  }

  private drawNodeTree(node: CanvasUI.VirtualNode): void {
    console.log("CanvasUI.draw", { node });
    node.view.calculateLayout();
    node.view.draw(this.scene.canvas);
    node.children.forEach(child => {
      this.drawNodeTree(child);
    });
  }

  public static createVirtualNode<P = {}>(
    ViewClass: new (properties: P, canvas: HTMLCanvasElement) => View<P>,
    properties: P & CanvasUI.BasePositionProperties,
    ...childNodes: CanvasUI.VirtualNode[]
  ): CanvasUI.VirtualNode {
    const viewInstance = new ViewClass(
      properties || (View.defaultProperties as any),
      CanvasUI.instance.scene.canvas
    );
    const render = viewInstance.render() || [];
    function setRelations(c: CanvasUI.VirtualNode): CanvasUI.VirtualNode {
      viewInstance.children.push(c.view as View);
      c.view.parent = viewInstance;
      return c;
    }

    const children = [
      ...(Array.isArray(render) ? render : [render]).map(setRelations),
      ...childNodes.map(setRelations)
    ];

    viewInstance.children = children.map(c => c.view) as View[];

    const node: CanvasUI.VirtualNode = {
      view: viewInstance,
      children: children
    };

    console.log("CanvasUI.createNode", {
      ViewClass,
      properties,
      childNodes
    });

    return node;
  }
}
