import { BaseTool } from "../base/baseTool";
import Floor from "../player/Floor";
export default class FloorModel {
    constructor(widthRandom, y, type) {
        this.widthRandom = 0;
        this.y = 0;
        this.type = 0;
        // 标记这个 mode 已经渲染了
        this.isUsed = false;
        this.widthRandom = widthRandom;
        this.y = y;
        this.type = type;
    }
    // 工厂方法，生成数据模型
    static init(arr) {
        const floorModels = [];
        arr.forEach((item) => {
            const model = new FloorModel(item.widthRandom, item.y, item.type);
            floorModels.push(model);
        });
        return floorModels;
    }
    /**
     * 根据数据与当前时间创建显示地板对象
     */
    createShow(dataBus) {
        if (!dataBus.map.y)
            return;
        const y = this.y - dataBus.map.y;
        if (y > 0 && y < BaseTool.height && !this.isUsed) {
            this.isUsed = true;
            const floor = dataBus.pool.getItemByClass("Floor", Floor);
            floor.init(this.widthRandom * (BaseTool.width - floor.width), y, this.type);
            dataBus.floors.push(floor);
        }
    }
}