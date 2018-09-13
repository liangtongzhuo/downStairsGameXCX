/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = "", swidth = 0, sheight = 0) {
    this.visible = true;
    // 画布上位置
    this.x = 0;
    this.y = 0;
    this.img = new Image();
    this.img.src = imgSrc;
    this.swidth = swidth;
    this.sheight = sheight;
  }
  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible) {
      return;
    }
    if (this.sx || this.sx === 0) {
      ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sprite) {
    const sp = sprite;
    const spX = sp.x + sp.width / 2;
    const spY = sp.y + sp.height / 2;
    if (!this.visible || !sp.visible) {
      return false;
    }
    return !!(spX >= this.x &&
      spX <= this.x + this.width &&
      spY >= this.y &&
      spY <= this.y + this.height);
  }
}
