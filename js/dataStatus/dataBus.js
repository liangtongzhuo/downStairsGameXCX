/**
 * 全局状态管理器，单例
 */
import {
  Direction
} from "../base/baseTool";
import Pool from "./pool";
export default class DataBus {
  constructor() {
    this.pool = new Pool();
    this.floors = [];
    // 地图坐标
    this.map = {
      date: 0,
      y: 0
    };
    this.man = {
      horizontal: Direction.Stand,
      point: {
        x: 0,
        y: 0
      },
      vertical: Direction.Down
    };
    this.frame = 0;
    // 网络数据
    this.netDataFloors = [];
    // 其他用户数据
    this.users = {};
    // otherMan
    this.otherMans = {};
    // userId
    this.userId = Date.now() + "";
    // 当前的分数
    this.score = 1;
    // 总分数
    this.totalScore = 0;
    // gameOver，5 是正常，9 游戏时间到了，10 死亡没有弹窗，11 死亡弹窗
    this.gameOver = 5;
    // 游戏进行时间
    this.startEndTime = -1;
    return DataBus.instance;
  }
  /**
   * 更新当前地图 y 值
   */
  update() {
    this.frame++;
    // 根据时间计算地图 Y
    if (this.map.date) {
      const currentDate = Date.now();
      const diffTime = currentDate - this.map.date;
      // 计算 y 的位置，每 16.666 毫秒 1 像素
      this.map.y = diffTime / 16.66666;
    }
  }
  /**
   * 总数据找出对象，加入缓存池
   */
  floorAddPool(floor) {
    this.floors.forEach((item, index) => {
      if (item === floor) {
        this.floors.splice(index, 1);
        this.pool.recover("Floor", floor);
      }
    });
  }
  /**
   * TODO 总数据找出对象，加入缓存池
   */
  otherManAddPool(floor) {
    this.floors.forEach((item, index) => {
      if (item === floor) {
        this.floors.splice(index, 1);
        this.pool.recover("Floor", floor);
      }
    });
  }
}
DataBus.instance = new DataBus();