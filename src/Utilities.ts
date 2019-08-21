export class Utilities {
  public static get windowDimensions(): { width: number; height: number } {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.outerWidth || 0
    );
    const height = Math.max(
      document.documentElement.clientHeight,
      window.outerHeight || 0
    );

    return { width, height };
  }

  public static get devicePixelRatio(): number {
    return window.devicePixelRatio || 1;
  }
}
