import { prototype } from "events";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Sprite)
    img: cc.Sprite = null;

    @property(cc.SpriteAtlas)
    imgs: cc.SpriteAtlas = null;

    private x: number = 0;
    private y: number = 0;
    private onClickCallback: (x: number, y: number) => void = null;
    init (x: number, y: number, onClickCallback: (x: number, y: number) => void) {
        this.x = x;
        this.y = y;
        this.onClickCallback = onClickCallback;
    }

    public setNum(num: number) {
        this.label.string = `${num}`;
        this.img.spriteFrame = this.imgs.getSpriteFrame("img_" + num);
    }

    protected onClick() {
        this.onClickCallback(this.x, this.y);
    }
}
