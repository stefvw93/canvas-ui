import { Power1, TweenMax } from "gsap";
import CanvasUI, { Rectangle, Text, Utilities } from "../src";
const testText =
  "The CanvasRenderingContext2D method fillText(), part of the Canvas 2D API, draws a text string at the specified coordinates, filling the string's characters with the current fillStyle.";
const testText1 =
  "An optional parameter allows specifying a maximum width for the rendered text, which the user agent will achieve by condensing the text or by using a lower font size.";
document.body.style.padding = "0";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

class Root extends Rectangle {
  render() {
    return this.attributes.childNodes;
  }

  animating = false;
  viewDidDraw(canvas: HTMLCanvasElement): void {
    if (!this.animating) {
      TweenMax.to(this, 4, {
        width: this.width * 0.8,
        height: this.height * 0.8,
        x: this.width * 0.1,
        y: this.height * 0.1,
        ease: Power1.easeInOut,
        yoyo: true
      }).repeat(-1);
    }
    this.animating = true;
  }
}

class RandomColor extends Rectangle {
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

  viewDidDraw() {}
}

class TextContainer extends Text {}

window.onload = function() {
  const ui = new CanvasUI();

  const app = (
    <Root
      width={Utilities.windowDimensions.width}
      height={Utilities.windowDimensions.height}
      fillStyle={"#fff"}
      layoutFlow="horizontal"
      layoutAlignment="space-around"
    >
      <RandomColor width={100} />
      <RandomColor layoutFlow="vertical">
        <RandomColor>
          <TextContainer text={testText} fillStyle="#fff" />
          <RandomColor />
        </RandomColor>
        <RandomColor layoutFlow="vertical" layoutAlignment="center">
          <RandomColor height={100}>
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
            <RandomColor />
          </RandomColor>
          <RandomColor height={20} />
          <RandomColor height={20} />
          <RandomColor height={20} />
        </RandomColor>
      </RandomColor>
    </Root>
  );

  ui.render(app);
  TweenMax.ticker.addEventListener("tick", () => {
    // console.clear();
    ui.render();
  });
};
