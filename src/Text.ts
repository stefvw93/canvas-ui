import { View } from "./View";

export abstract class Text<
  A = {},
  T extends CanvasUI.TextAttributes = CanvasUI.TextAttributes
> extends View<A, T> {
  public static defaultAttributes = {
    direction: "ltr",
    fillStyle: "#000",
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "",
    lineHeight: 21,
    text: "",
    textAlign: "left",
    textBaseline: "alphabetic",
    layoutFlow: "horizontal",
    relativePosition: "parent",
    layoutAlignment: "start"
  } as CanvasUI.TextAttributes;

  constructor(attributes: A & T) {
    super(attributes, Text.defaultAttributes as T);
    console.log(this.constructor.name, this.attributes);
  }

  public draw(canvas?: HTMLCanvasElement): void {
    const context = canvas.getContext("2d");
    const {
      direction,
      fillStyle,
      fontFamily,
      fontSize,
      fontStyle,
      textAlign,
      textBaseline
    } = this.attributes;

    context.save();
    context.direction = direction;
    context.fillStyle = fillStyle;
    context.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
    this.writeLines(context);
    // context.fillText(text, x + fontSize, y, width);
    context.restore();
  }

  private writeLines(context: CanvasRenderingContext2D): void {
    const { lineHeight, text } = this.attributes;
    const lines = [];
    const words = text.split(" ");
    const width = this.width;
    const offsetY = this.y;
    let line = "";
    let lineTest = "";
    let currentY = 0;

    for (let i = 0, l = words.length; i < l; i++) {
      lineTest = line + words[i] + " ";

      // Check total width of line or last word
      if (context.measureText(lineTest).width >= width) {
        // Calculate the new height
        currentY = lines.length * lineHeight + lineHeight + offsetY;

        // Record and reset the current line
        lines.push({ text: line, height: currentY });
        line = words[i] + " ";
      } else {
        line = lineTest;
      }
    }

    // Catch last line in-case something is left over
    if (line.length > 0) {
      currentY = lines.length * lineHeight + lineHeight + offsetY;
      lines.push({ text: line.trim(), height: currentY });
    }

    // Visually output text
    for (let i = 0, l = lines.length; i < l; i++) {
      context.fillText(
        lines[i].text,
        this.getPositionPropertyValue(this.x),
        lines[i].height
      );
    }
  }
}
