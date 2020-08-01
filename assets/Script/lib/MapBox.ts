import DensoFogMap from "./DenseFogMap";
import { isatty } from "tty";

export default class MapBox {
    private x: number = 0;
    private y: number = 0;
    private map: DensoFogMap = null;
    /**
     * @param x 格子横坐标
     * @param y 格子纵坐标
     */
    constructor(x: number, y: number, map: DensoFogMap) {
        this.x = x;
        this.y = y;
        this.map = map;
    }
    private num: number = 0;
    private active: boolean = false;
    public isActive() {
        return this.active;
    }
    public setActive(isActive: boolean) {
        if (this.active === isActive) {
            return;
        }
        this.active = isActive;
        this.updateVertex();
    }

    public update() {
        const vertexs = this.map.getVertexs4Box(this.x, this.y);
        let num = 0;
        vertexs.lu && vertexs.lu.isActive() && (num += 1);
        vertexs.ld && vertexs.ld.isActive() && (num += 4);
        vertexs.ru && vertexs.ru.isActive() && (num += 2);
        vertexs.rd && vertexs.rd.isActive() && (num += 8);
        this.setNum(num);
    }

    public getNum() {
        return this.num;
    }

    private setNum(num) {
        if (num === this.num) return;
        this.num = num;
        this.map.doBoxUpdate(this.x, this.y, this.num);
    }

    private updateVertex() {
        const vertexs = this.map.getVertexs4Box(this.x, this.y);
        for (const key in vertexs) {
            if (!vertexs[key]) continue;
            vertexs[key].update();
        }
    }
}
