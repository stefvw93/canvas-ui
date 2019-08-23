import { TweenMax } from "gsap";
import CanvasUI, { Rectangle, Utilities } from "../src";
const testText =
  "The CanvasRenderingContext2D method fillText(), part of the Canvas 2D API, draws a text string at the specified coordinates, filling the string's characters with the current fillStyle.";
const testText1 =
  "An optional parameter allows specifying a maximum width for the rendered text, which the user agent will achieve by condensing the text or by using a lower font size.";
document.body.style.padding = "0";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

class Parent extends Rectangle {
  render() {
    return this.attributes.childNodes;
  }

  // animating = false;
  // onLayout(canvas: HTMLCanvasElement): void {
  //   if (!this.animating) {
  //     TweenMax.to(this, 4, {
  //       width: this.getPositionPropertyValue(this.attributes.width || 4) / 4,
  //       height: this.getPositionPropertyValue(this.attributes.height || 4) / 4,
  //       x: this.getPositionPropertyValue(this.attributes.width || 4) / 4,
  //       y: this.getPositionPropertyValue(this.attributes.height || 4) / 4,
  //       yoyo: true
  //     }).repeat(-1);
  //   }
  //   this.animating = true;
  // }
}

class Box extends Rectangle {
  constructor(a: CanvasUI.RectangleAttributes) {
    super(a);
    const rgb = `rgb(${[
      Math.round(Math.random() * 255 + 1),
      Math.round(Math.random() * 255 + 1),
      Math.round(Math.random() * 255 + 1)
    ].join(",")})`;
    this.attributes.fillStyle = rgb;
  }

  render() {
    return this.attributes.childNodes;
  }
}

window.onload = function() {
  const ui = new CanvasUI();

  const app = (
    <Parent
      width={Utilities.windowDimensions.width}
      height={Utilities.windowDimensions.height}
      fillStyle={"green"}
    >
      <Box width={50} />
      <Box width={100} />
      <Box layoutFlow="vertical">
        <Box />
        <Box />
        <Box />
      </Box>
    </Parent>
  );

  ui.render(app);
  TweenMax.ticker.addEventListener("tick", () => {
    // console.clear();
    // ui.render();
  });
};
