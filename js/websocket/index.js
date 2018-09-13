"use strict";

/**
 *
 * websocket
 */


import {
  BaseTool,
  url   
} from "../base/baseTool";
import OtherManModel from "../model/OtherManModel";
import DataBus from "../dataStatus/dataBus";

const dataBus = new DataBus();
const wsurl = `ws://${url}:3002?userId=${dataBus.userId}`;
var ws;

function initWs() {
  wx.connectSocket({
    url: wsurl,
    success: function() {
      console.log("open");
    }
  });
  /**
   * 服务器发送过来的状态
   * @param {* 事件} e
   */
  wx.onSocketMessage((e) => {
    if (!e.data) return;
    const data = JSON.parse(e.data);
    if (data.actionName === "user") {
      dataBus.users = data.users;
    }
  });
  /**
   * 向服务同步状态
   */
  setInterval(() => {
    // ws 未连接直接返回
    if (!ws || ws.readyState !== ws.OPEN)
      return;
    var x = dataBus.man.point.x / BaseTool.BaseTool.width;
    var y = dataBus.man.point.y + dataBus.map.y;
    var otherManModel = new OtherManModel(dataBus.userId, x, y);
    wx.sendSocketMessage({
      data: JSON.stringify(otherManModel)
    });
  }, 30);
  /**
   * 服务器关闭
   */
  wx.onSocketClose((e) => {
    console.log("close:", e);
    setTimeout(function() {
      initWs();
    }, 5000);
  });
  /**
   * 报错
   */
  wx.onSocketError((e) => {
    console.error("error:", e);
    setTimeout(() => {
      initWs();
    }, 5000);
  });
};
initWs();