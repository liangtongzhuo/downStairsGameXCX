import {
  BaseTool
} from "../base/baseTool";


/**
 * 文字
 */
export default class Title {

  static render(ctx, font = 'bold 15px Arial', textAlign = 'left', textBaseline = 'bottom', fillStyle = '#fff', title, x = 10, y = 10) {
    ctx.font = font
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = fillStyle;
    ctx.fillText(title, x, y);
  }

}