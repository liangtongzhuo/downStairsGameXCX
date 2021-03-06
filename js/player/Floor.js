import Sprite from "../base/sprite";
import DataBus from "../dataStatus/dataBus";
// 相关常量设置
const IMG_SRC = "images/img/floor.png";

// 剪切的宽高
const WIDTH = 200;
const HEIGHT = 32;
export default class Floor extends Sprite {
  constructor() {
    super(IMG_SRC, WIDTH, HEIGHT);
    this.dataBus = new DataBus();
    // 动画剪切位置
    this.sx = 0;
    this.sy = 0;
    // 显示到屏幕的宽高
    this.width = 100;
    this.height = 16;
    // 显示屏幕的位置
    this.x = 0;
    this.y = 0;
    // 是否碰撞了
    this.collision = false;
  }
  // 初始值
  init(x = 0, y = 0, type = 0) {
    this.visible = true;
    this.collision = false;

    this.x = x;
    this.y = y;
    if (type === 0)
      this.sy = 0;
    if (type === 1)
      this.sy = 32;
  }
  // 更新动画
  update() {
    this.y--;
    this.judgeAddPool();
  }
  // 判断边界是否进入对象池
  judgeAddPool() {
    // 判断是否出屏幕
    if (this.visible && this.y < -this.height) {
      this.visible = false;
      this.dataBus.floorAddPool(this);
    }
  }
}