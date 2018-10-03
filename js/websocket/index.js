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
let websocket;
let isConnet = false;

function initWs() {
  websocket = wx.connectSocket({
    url: wsurl
  });
  /**
   * 连接成功
   */
  wx.onSocketOpen(() => {
    isConnet = true;
    console.log('onSocketOpen');
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
    // wx 未连接直接返回
    if (!isConnet) return;

    const x = dataBus.man.point.x / BaseTool.width;
    const y = dataBus.man.point.y + dataBus.map.y;
    const otherManModel = new OtherManModel(dataBus.userId, x, y);
    wx.sendSocketMessage({
      data: JSON.stringify(otherManModel)
    });
  }, 30);
  /**
   * 服务器关闭
   */
  wx.onSocketClose((e) => {
    isConnet = false;
    console.log("close:", e);
    setTimeout(function() {
      initWs();
    }, 5000);
  });
  /**
   * 报错
   */
  wx.onSocketError((e) => {
    isConnet = false;
    console.error("error:", e);
    setTimeout(() => {
      initWs();
    }, 5000);
  });
};
initWs();