import { prototype } from "events";
import DensoFogMap, { IBox } from "./lib/DenseFogMap";
import Item from "./Item";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private item: cc.Prefab = null;

    @property
    private x: number = 5;

    @property
    private y: number = 15;

    private mep: DensoFogMap = null;
    private items: cc.Node[][] = [];
    start () {
        this.mep = new DensoFogMap(this.x, this.y, this.onChange.bind(this));
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                this.items[x] || (this.items[x] = []);
                this.items[x][y] = cc.instantiate(this.item);
                this.items[x][y].parent = this.content;
                this.items[x][y].getComponent(Item).init(x, y, this.onClickItem.bind(this));
            }
        }
    }

    public onClickItem(x: number, y: number) {
        const isActive = this.mep.isBoxActive(x, y);
        this.mep.setBoxActive(x, y, !isActive);
    }

    private onChange(boxs: IBox[]) {
        boxs.forEach((box) => {
            const item = this.items[box.x][box.y];
            item && item.getComponent(Item).setNum(box.num);
        });
    }
}
