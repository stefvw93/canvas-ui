import CanvasUI, { Rectangle, Utilities } from "../src";

document.body.style.padding = "0";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

class Parent extends Rectangle {
  spacing = 40;
  constructor(p, c) {
    super(p, c);
    this.properties.fillColor = "lightblue";
  }

  render() {
    return [
      <Child />,
      <Child height={100} />,
      <Child height={100} />,
      <Child />
    ];
  }
}

class Child extends Rectangle {
  constructor(properties, canvas: HTMLCanvasElement) {
    super(properties, canvas);
    console.log(this);
  }

  draw(canvas: HTMLCanvasElement): void {
    const { x, y, width, height, fillColor } = this.properties;
    console.log("Child.draw", { x, y, width, height });
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(x, y, x + width, y + height);
    gradient.addColorStop(0, fillColor as string);
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "red");
    this.properties.fillColor = gradient;
    super.draw(canvas);
  }
}

window.onload = function() {
  const ui = new CanvasUI();
  const app = (
    <Parent
      x={20}
      y={20}
      width={Utilities.windowDimensions.width - 40}
      height={Utilities.windowDimensions.height - 40}
      layoutFlow="vertical"
    />
  );
  ui.render(app);
};
