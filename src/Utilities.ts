export class Utilities {
  public static get windowDimensions(): { width: number; height: number } {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    const height = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    return { width, height };
  }

  public static get devicePixelRatio(): number {
    return window.devicePixelRatio || 1;
  }

  public static isNode(test: any): boolean {
    return typeof test === "object" && !!test.view && !!test.children;
  }
}
