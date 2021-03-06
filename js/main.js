import {
  BaseTool,
  Direction,
  RequestAnimationFrame
} from "./base/baseTool";
import DataBus from "./dataStatus/dataBus";
import initMap from "./http/initMap";
import OtherManModel from "./model/OtherManModel";
import Man from "./player/Man";
import BackGround from "./runtime/background";
import Title from "./runtime/title.js";
import "./websocket/index.js";
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dataBus = new DataBus();
    this.backGround = new BackGround();
    // 自己人物
    this.man = new Man();
  }
  // 开始
  start() {
    this.canvas.width = BaseTool.width;
    this.canvas.height = BaseTool.height;
    this.canvas.addEventListener("touchstart", this.touchstart.bind(this));
    this.canvas.addEventListener("touchmove", this.touchmove.bind(this));
    this.canvas.addEventListener("touchend", this.touchend.bind(this));
    this.loop();
    // 请求初始化地图
    initMap();
  }
  /**
   * 重新开始
   */
  restart() {
    console.log("重新开始");
  }
  /**
   * 点击接触调用
   */
  touchstart(e) {
    e.preventDefault();
    // const { clientX, clientY } = e.touches[0];
    // alert(clientX+clientY)
    // console.log(clientX, clientY);
  }
  /**
   * 点击之后滑动持续调用
   */
  touchmove(e) {
    e.preventDefault();
    // const { clientX, clientY } = e.touches[0];
    // alert(clientX+clientY)
    // console.log(clientX, clientY);
  }
  /**
   * 手抬起来会调用
   */
  touchend(e) {
    e.preventDefault();
    const {
      clientX
    } = e.changedTouches[0];
    if (clientX < BaseTool.width / 2) {
      this.dataBus.man.horizontal = Direction.Left;
    } else {
      this.dataBus.man.horizontal = Direction.Right;
    }
  }
  /**
   * 碰撞检测
   */
  collisionDetection() {
    this.dataBus.floors.forEach(floor => {
      if (this.man.collisionDetectionFloor(floor)) {
        this.dataBus.man.vertical = Direction.Stand;
      }
    });
  }
  /**
   * 根据数据生成显示对象
   */
  create() {
    this.dataBus.netDataFloors.forEach(dataFloor => dataFloor.createShow(this.dataBus));
    OtherManModel.createOtherManOrUpdate(this.dataBus);
  }
  /**
   * 更新数据状态
   */
  update() {
    this.dataBus.update();
    this.backGround.update();
    this.dataBus.floors.forEach(floor => floor.update());
    this.man.update();
    // 更新其它用户
    for (const userId in this.dataBus.otherMans) {
      if (this.dataBus.otherMans.hasOwnProperty(userId)) {
        const otherMan = this.dataBus.otherMans[userId];
        if (otherMan)
          otherMan.update();
      }
    }
    this.collisionDetection();
  }
  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.backGround.drawToCanvas(this.ctx);
    this.dataBus.floors.forEach(floor => floor.drawToCanvas(this.ctx));
    this.man.drawToCanvas(this.ctx);
    // 更新其它用户
    let i = 1;
    for (const userId in this.dataBus.otherMans) {
      if (this.dataBus.otherMans.hasOwnProperty(userId)) {
        i++;
        const otherMan = this.dataBus.otherMans[userId];
        otherMan.drawToCanvas(this.ctx);
      }
    }

    // 渲染文字
    const time = parseInt(60 - this.dataBus.startEndTime)
    Title.render(this.ctx, 'bold 15px Arial', 'left', 'bottom', '#fff', 'End time  ' + time, 10, 30);
    Title.render(this.ctx, 'bold 15px Arial', 'left', 'bottom', '#fff', 'Online player  ' + i, 10, 50);
    Title.render(this.ctx, 'bold 15px Arial', 'left', 'bottom', '#fff', `My score  ${this.dataBus.score}, Total score ${this.dataBus.totalScore}`, 10, 70);
    if (this.dataBus.gameOver != 5) {
      Title.render(this.ctx, 'bold 15px Arial', 'left', 'bottom', '#fff', 'Your game is over, wait for the start  ' + time, 10, 90);
    }
  }
  // 实现游戏帧循环
  loop() {
    this.gameStartOrEnd();
    this.create();
    this.update();
    this.render();
    RequestAnimationFrame(this.loop.bind(this));
  }
  /**
   * 游戏结束逻辑
   */
  gameStartOrEnd() {
    // 计算比赛开始了多少秒
    if (this.dataBus.map.date) this.dataBus.startEndTime = (Date.now() - this.dataBus.map.date) / 1000;
    // 游戏死亡
    if (this.dataBus.gameOver == 10) {
      this.dataBus.gameOver = 11;
      this.man.visible = false;
      wx.showModal({
        title: 'GAME OVER',
        content: `你控制的小人貌似没有生命了，不要灰心难过，因为你为这个游戏贡献了 ${this.dataBus.score} 层积分。`,
        showCancel: false,
        success: res => {
          console.log(res.confirm);
        }
      });
    }
    // 游戏结束
    if (this.dataBus.startEndTime > 60 && (this.dataBus.gameOver == 5 || this.dataBus.gameOver == 11)) {
      this.dataBus.gameOver = 12;
      wx.showModal({
        title: 'GAME OVER',
        content: '旧已经结束，新轮回已开始了，我想你不需要孤独，去和同伴一起奔跑吧！',
        showCancel: false,
        success: (res) => {
          // 初始化数据
          this.dataBus.floors = [];
          this.man.visible = true;
          this.man.x = BaseTool.width / 2;
          this.man.y = 70;
          initMap();
          this.dataBus.gameOver = 5;
        }
      });
    }
  }
}