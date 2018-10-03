import {
  BaseTool,
  Direction
} from "../base/baseTool";
import Sprite from "../base/sprite";
import DataBus from "../dataStatus/dataBus";
// 相关常量设置
const IMG_SRC = "images/img/man.png";
// 剪切的宽高
const WIDTH = 64;
const HEIGHT = 64;
export default class Man extends Sprite {
  constructor() {
    super(IMG_SRC, WIDTH, HEIGHT);
    this.frame = 0;
    this.dataBus = new DataBus();
    this.xSpeed = 3;
    this.ySpeed = 2;
    // 暂持存储状态，强制更新画面用
    this.horizontalStatus = Direction.Stand;
    // 动画剪切位置
    this.sx = 0;
    this.sy = 0;
    // 显示到屏幕的宽高
    this.width = 40;
    this.height = 40;
    // 显示屏幕的位置
    this.x = (BaseTool.width - this.width) / 2;
    this.y = 70;
  }
  // 更新动画
  update() {
    this.frame += 1;
    this.frame %= 21;
    this.horizontal();
    this.vertical();
    this.dataBus.man.vertical = Direction.Down;
    this.dataBus.man.point.x = this.x;
    this.dataBus.man.point.y = this.y;
  }
  /**
   * 地板碰撞
   * @param{Floor} floor: Floor 的实例
   */
  collisionDetectionFloor(floor) {
    if (!this.visible || !floor.visible)
      return false;
    return !!(floor.y <= this.y + this.height &&
      floor.y + floor.height >= this.y + this.height &&
      floor.x <= this.x + this.width &&
      floor.x + floor.width >= this.x);
  }
  /**
   * 水平移动
   */
  horizontal() {
    // 更新状态瞬间刷新界面
    if (this.horizontalStatus !== this.dataBus.man.horizontal) {
      if (this.dataBus.man.horizontal === Direction.Left)
        this.sx = 3 * WIDTH;
      if (this.dataBus.man.horizontal === Direction.Right)
        this.sx = 5 * WIDTH;
    }
    this.horizontalStatus = this.dataBus.man.horizontal;
    if (this.dataBus.man.horizontal === Direction.Left) {
      if (this.x > 0)
        this.x -= this.xSpeed;
      if (this.frame === 10)
        this.sx = 3 * WIDTH;
      if (this.frame === 20)
        this.sx = 4 * WIDTH;
    } else if (this.dataBus.man.horizontal === Direction.Right) {
      if (this.x < BaseTool.width - this.width)
        this.x += this.xSpeed;
      if (this.frame === 10)
        this.sx = 5 * WIDTH;
      if (this.frame === 20)
        this.sx = 6 * WIDTH;
    }
  }
  /**
   * 上下移动
   */
  vertical() {
    // 向上
    if (this.dataBus.man.vertical === Direction.Top) {
      this.sx = 2 * WIDTH;
      // 向下
    } else if (this.dataBus.man.vertical === Direction.Down) {
      this.y += this.ySpeed;
      this.sx = 1 * WIDTH;
      // 站立
    } else if (this.dataBus.man.vertical === Direction.Stand) {
      this.y--;
      if (this.dataBus.man.horizontal === Direction.Stand)
        this.sx = 0 * WIDTH;
    }

    // 判断游戏是否结束
    if ((this.y - BaseTool.height > 64 || this.y < 0) && this.dataBus.gameOver === 5) {
      this.dataBus.gameOver = 10;
    }

  }
}