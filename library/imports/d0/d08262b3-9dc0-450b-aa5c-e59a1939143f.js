"use strict";
cc._RF.push(module, 'd0826KzncBFC6pc5ZoZORQ/', 'ScratchCardCtrl');
// Script/ScratchCardCtrl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        cardBg: cc.Sprite, // 底层精灵
        resultLabel: cc.Label,
        mask: cc.Mask, // 遮罩组件（实现擦除功能）
        promptLabel: cc.Label, // 提示文字
        sucFlagNode: {
            default: [],
            type: [cc.Node],
            tooltip: "标记需要擦除区域，每个node大小为单次擦除大小，默认30像素。"
        },
        _sucFlag: [cc.Boolean] //标记已经擦除的区域
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);

        for (var i = 0; i < this.sucFlagNode.length; i++) {
            this._sucFlag.push(false);
        }
    },

    onDestroy: function onDestroy() {
        this._removeTouchEvent();
    },

    _removeTouchEvent: function _removeTouchEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    start: function start() {
        //


        // var x =-100;
        // var y =-100;
        // var width =300;
        // var height = 200;
        // var rectangle = [cc.v2(x, y),
        //     cc.v2(x + width, y),
        //     cc.v2(x + width, y + height),
        //     cc.v2(x, y + height)];
        //
        // stencil.drawPoly(rectangle, color, 0, color);

        // stencil.drawPoly(this.mask._calculateCircle(cc.p(0,0),cc.p(100,100), 64), color, 0, color);
        //
        // stencil.drawPoly(this.mask._calculateCircle(cc.p(200,200),cc.p(50,50), 64), color, 0, color);

    },

    _onTouchBegin: function _onTouchBegin(event) {

        cc.log('touchBegin');

        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchMoved: function _onTouchMoved(event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchEnd: function _onTouchEnd(event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchCancel: function _onTouchCancel(event) {
        // var point = event.touch.getLocation();
        // point = this.node.convertToNodeSpaceAR(point);
        // this._addCircle(point);
    },

    _addCircle: function _addCircle(point) {
        var stencil = this.mask._clippingStencil;
        var color = cc.color(255, 255, 255, 0);
        stencil.drawPoly(this.mask._calculateCircle(point, cc.p(30, 30), 64), color, 0, color);
        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
        this._checkFinish(point);
    },

    _checkFinish: function _checkFinish(point) {
        var res = true;
        for (var i = 0; i < this.sucFlagNode.length; i++) {
            var node = this.sucFlagNode[i];
            if (cc.rectContainsPoint(node.getBoundingBox(), point)) {
                this._sucFlag[i] = true;
            }
            if (!this._sucFlag[i]) {
                res = false;
            }
        }
        if (res) {
            this._removeTouchEvent();
            cc.log("擦除完成...");
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();