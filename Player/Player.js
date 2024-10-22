/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Player/costumes/costume1.svg", {
        x: 32.793174743652344,
        y: 32.63158416748047,
      }),
      new Costume("costume2", "./Player/costumes/costume2.svg", {
        x: 32.793182373046875,
        y: 32.63158416748047,
      }),
    ];

    this.sounds = [new Sound("Plopp", "./Player/sounds/Plopp.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
    ];

    this.isJumping = false;  // 标记是否正在跳跃
    this.canJump = true;     // 标记是否可以跳跃
  }

  // 定义跳跃逻辑
  handleJump() {
    if (!this.isJumping && this.canJump) {
      console.log("Jump triggered!");  // 调试日志
      this.stage.vars.y2 = 15;  // 向上跳跃的距离
      this.x += 10;  // 每次跳跃向右移动10单位
      this.isJumping = true;  // 标记正在跳跃
      this.canJump = false;  // 禁止连续跳跃，直到玩家落地
    }
  }

  *whenGreenFlagClicked() {
    this.size = 65;
    this.moveAhead();
    this.costume = "costume1";
    this.effects.ghost = 0;
    this.visible = true;
    this.goto(-180, -50);
    this.stage.vars.level = 1;
    this.stage.vars.x = 0;
    this.stage.vars.y2 = 0;
    this.direction = 90;

    while (true) {
      this.stage.vars.y2--;

      // 检测按下Enter键触发跳跃，只允许跳一次，直到落地
      if (this.keyPressed("enter") && !this.isJumping) {
        this.handleJump();
      }

      // 检测玩家是否碰到平台，并调整位置，防止下沉
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y = this.sprites["Platforms"].y + 10;  // 防止玩家穿透平台
        this.isJumping = false;  // 允许再次跳跃
        this.canJump = true;  // 玩家着陆后可以再次跳跃
        this.stage.vars.y2 = 0;  // 重置下落速度，避免下沉
      }

      // 更新y轴的位置
      this.y += this.toNumber(this.stage.vars.y2);

      // 防止玩家掉出屏幕外
      if (this.compare(this.y, 180) > 0) {
        this.stage.vars.y2 = 0;  // 当达到顶部时停止上升
      }
      yield;
    }
  }

  *whenIReceiveNow() {}

  *whenGreenFlagClicked2() {
    this.stage.vars.level = 1;
    while (true) {
      if (
        this.keyPressed("b") ||
        this.touching(this.sprites["Spikes"].andClones())
      ) {
        this.goto(-180, -50);
        this.broadcast("dead");
      }
      if (this.compare(this.x, 246) > 0) {
        this.goto(-180, -50);
        this.broadcast("levelup");
        this.stage.vars.level++;
      }
      if (this.toNumber(this.stage.vars.level) === 15) {
        this.broadcast("end");
        /* TODO: Implement stop other scripts in sprite */ null;
      }
      yield;
    }
  }
}
