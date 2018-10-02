/**
 * 基础信息
 */
export class BaseTool {
  static width = window.innerWidth;
  static height = window.innerHeight;

}
BaseTool
/**
 * 每一帧渲染图
 */
export const RequestAnimationFrame = window.requestAnimationFrame;
/**
 * 方向
 */
export let Direction;
(function(Direction) {
  Direction[Direction["Top"] = 0] = "Top";
  Direction[Direction["Right"] = 1] = "Right";
  Direction[Direction["Down"] = 2] = "Down";
  Direction[Direction["Left"] = 3] = "Left";
  Direction[Direction["Stand"] = 4] = "Stand";
})(Direction || (Direction = {}));

// 地址配置
export const url = '192.168.1.104';