import MapBox from "./MapBox";
import MapVertex from "./MapVertex";
import { setTimeout } from "timers";

export interface IBox {
    x: number,      // 地图格子横坐标
    y: number,      // 地图格子纵坐标
    num: number,    // 地图格子类型数值
}

export default class DensoFogMap {
    private x: number = 0;
    private y: number = 0;
    private onChange: (boxs: IBox[]) => void = null;
    /**
     * @param x 地图列数
     * @param y 地图行数
     * @param onChange 
     */
    constructor(x: number, y: number, onChange: (boxs: IBox[]) => void) {
        this.x = x;
        this.y = y;
        this.onChange = onChange;

        this.init();
    }

    private boxs: MapBox[][] = [];
    private vertex: MapVertex[][] = [];
    private init() {
        for (let x = 0; x <= this.x; x++) {
            this.vertex[x] = [];
            if (x < this.x) this.boxs[x] = [];
            for (let y = 0; y <= this.y; y++) {
                this.vertex[x][y] = new MapVertex(x, y, this);
                if (x < this.x) {
                    this.boxs[x][y] = new MapBox(x, y, this);
                }
            }
        }
    }

    /**
     * 指定格子是否激活
     * @param x 
     * @param y 
     */
    public isBoxActive(x: number, y: number) {
        const box = this.getBox(x, y);
        return box ? box.isActive() : false;
    }

    /**
     * 设置指定格子激活状态
     * @param x 
     * @param y 
     * @param isActive 
     */
    public setBoxActive(x: number, y: number, isActive: boolean) {
        const box = this.getBox(x, y);
        box && box.setActive(isActive);
    }

    private boxUpdateList: Set<IBox> = new Set<IBox>();
    private boxUpdateing: boolean = false;
    public doBoxUpdate(x: number, y: number, num: number) {
        this.boxUpdateList.add({x, y, num});
        if (this.boxUpdateing) return;
        this.boxUpdateing = true;
        setTimeout(() => {
            this.boxUpdateing = false;
            const boxs: IBox[] = [];
            this.boxUpdateList.forEach((box) => {
                boxs.push(box);
            });
            this.boxUpdateList.clear();
            this.onChange(boxs);
        }, 0);
    }

    public getVertexs4Box(x: number, y: number) {
        const lu = this.getVertex(x, y + 1);
        const ld = this.getVertex(x, y);
        const ru = this.getVertex(x + 1, y + 1);
        const rd = this.getVertex(x + 1, y);
        return {lu, ld, ru, rd};
    }

    public getBoxs4Vertex(x: number, y: number) {
        const lu = this.getBox(x - 1, y);
        const ld = this.getBox(x - 1, y - 1);
        const ru = this.getBox(x, y);
        const rd = this.getBox(x, y - 1);
        return {lu, ld, ru, rd};
    }

    private getBox(x: number, y: number) {
        if (this.boxs[x]) {
            return this.boxs[x][y];
        }
        return null;
    }
    
    private getVertex(x: number, y: number) {
        if (this.vertex[x]) {
            return this.vertex[x][y];
        }
        return null;
    }
}
