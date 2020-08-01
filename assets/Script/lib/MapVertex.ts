import DensoFogMap from "./DenseFogMap";
import { isatty } from "tty";

export default class MapVertex {
    private x: number = 0;
    private y: number = 0;
    private map: DensoFogMap = null;
    /**
     * @param x 格子定点横坐标
     * @param y 格子顶点纵坐标
     */
    constructor(x: number, y: number, map: DensoFogMap) {
        this.x = x;
        this.y = y;
        this.map = map;
    }

    public update() {
        let isActive = false;
        const boxs = this.map.getBoxs4Vertex(this.x, this.y);
        for (const key in boxs) {
            if (!boxs[key]) continue;
            if (boxs[key].isActive()) {
                isActive = true;
                break;
            }
        }
        this.setActive(isActive);
    }

    private active: boolean = false;
    public isActive() {
        return this.active;
    }
    private setActive(isActive: boolean) {
        if (this.active === isActive) {
            return;
        }
        this.active = isActive;
        this.updateBox();
    }

    private updateBox() {
        const boxs = this.map.getBoxs4Vertex(this.x, this.y);
        for (const key in boxs) {
            if (!boxs[key]) continue;
            boxs[key].update()
        }
    }
}
