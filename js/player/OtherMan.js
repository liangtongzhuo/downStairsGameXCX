import {
  BaseTool,
  Direction
} from "../base/baseTool";
import Sprite from "../base/sprite";
// 相关常量设置
const IMG_SRC = "images/img/man.png";
// 剪切的宽高
const WIDTH = 64;
const HEIGHT = 64;
export default class OtherMan extends Sprite {
  // 暂持存储状态，比较是瞬间更新
  horizontalStatus = Direction.Stand;
  constructor() {
    super(IMG_SRC, WIDTH, HEIGHT);
    this.frame = 0;
    // public horizontal = Direction.Stand;
    this.xSpeed = 3;
    this.ySpeed = 2;
    this.xNear = 0;
    this.yNear = 0;
    // 动画剪切位置
    this.sx = 0;
    this.sy = 0;
    // 显示到屏幕的宽高
    this.width = 40;
    this.height = 40;
    // 显示屏幕的位置
    this.x = (BaseTool.width - this.width) / 2;
    this.y = 0;
    // 存储渐进坐标
    this.xNear = this.x;
    this.yNear = this.y;
    // 记录是否刷新
    this.refresh = false;
  }
  /**
   * 动画
   */
  update() {
    this.frame += 1;
    this.frame %= 21;
    // 计算成渐进式，动画看起来顺畅
    this.computeNearXY();
    this.horizontalFun();
    this.verticalFun();
  }
  /**
   * 计算 XY 渐进式坐标
   */
  computeNearXY() {
    const xNear = this.x - this.xNear;
    let xDistance;
    if (xNear >= 0) {
      xDistance = xNear < this.xSpeed ? xNear : this.xSpeed;
    } else {
      xDistance = -this.xSpeed < xNear ? xNear : -this.xSpeed;
    }
    this.x = xDistance + this.xNear;
    this.xNear = this.x;
    const yNear = this.y - this.yNear;
    const yDistance = yNear < this.ySpeed ? yNear : this.ySpeed;
    this.y = yDistance + this.yNear;
    this.yNear = this.y;


    // 更新动作
    if (yDistance < -2)
      this.vertical = Direction.Top;
    else if (yDistance > -0)
      this.vertical = Direction.Down;
    else if (xDistance < 0)
      this.vertical = Direction.Left;
    else if (xDistance > 0)
      this.vertical = Direction.Right;
    else if (this.x < BaseTool.width / 2)
      this.vertical = Direction.Left;
    else if (this.x > BaseTool.width / 2)
      this.vertical = Direction.Right;


    if (this.horizontalStatus != this.vertical) {
      this.refresh = true;
    } else {
      this.refresh = false;
    }
    this.horizontalStatus = this.vertical;
  }
  /**
   * 水平移动
   */
  horizontalFun() {
    if (this.vertical === Direction.Left) {
      if (this.frame === 10 || this.refresh)
        this.sx = 3 * WIDTH;
      if (this.frame === 20)
        this.sx = 4 * WIDTH;
    } else if (this.vertical === Direction.Right) {
      if (this.frame === 10 || this.refresh)
        this.sx = 5 * WIDTH;
      if (this.frame === 20)
        this.sx = 6 * WIDTH;
    }
  }
  /**
   * 上下移动
   */
  verticalFun() {
    if (this.vertical === Direction.Top || this.refresh) {
      this.sx = 2 * WIDTH;
      // 向下
    } else if (this.vertical === Direction.Down || this.refresh) {
      this.sx = 1 * WIDTH;
    }
  }
}