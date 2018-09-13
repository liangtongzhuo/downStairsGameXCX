/**
 *
 * websocket
 */
import DataBus from "../dataStatus/dataBus";
import FloorModel from "../model/FloorModel";
import { url } from '../base/baseTool.js'
const dataBus = new DataBus();
// 请求地图初始化数据，转换成模型储存
export default () => {
  wx.request({
    url: `http://${url}:3001/mapInit`,
    method: "GET",
    data: {
      userId: dataBus.userId
    },
    success: function(result) {
      if (result.data && result.data.date) {
        dataBus.netDataFloors = FloorModel.init(result.data.floors)
        dataBus.map.date = result.data.date
      } else {
        console.log('请求失败');
      }

    },
    fail: function(error) {
      console.log('加载失败', error);
    }
  });

};