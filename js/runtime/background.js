import Sprite from '../base/sprite'
import {
  BaseTool
} from "../base/baseTool";

const BG_IMG_SRC = 'images/bg.jpeg'
/**
 * 游戏背景类
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BaseTool.width, BaseTool.height)
    // 动画剪切位置
    this.sx = 0;
    this.sy = 0;
    // 显示到屏幕的宽高
    this.width = BaseTool.width;
    this.height = BaseTool.height;
    // 显示屏幕的位置
    this.x = 0;
    this.y = 0;
  }

  update() {
    this.sy = this.sy + 0.1;
    if (this.sy > 2048 - BaseTool.height){
      this.sy = 0;
      this.sx = (800 - BaseTool.width) * Math.random();
    }
  }
}