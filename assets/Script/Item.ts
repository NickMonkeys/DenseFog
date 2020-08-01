// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

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
    }

    protected onClick() {
        this.onClickCallback(this.x, this.y);
    }
}
