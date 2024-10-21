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
  }

  // 定义跳跃逻辑
  handleJump() {
    console.log("Jump triggered!");  // 调试日志
    this.stage.vars.y2 = 15;  // 垂直跳跃速度
    if (this.compare(Math.abs(this.toNumber(this.stage.vars.x)), this.stage.vars.x) === 0) {
      this.stage.vars.x = -5;  // 水平跳跃调整
    } else {
      this.stage.vars.x = 5;
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

    // 直接从 this.playerSpeed 读取速度
    const playerSpeed = this.playerSpeed || 1;

    while (true) {
      this.stage.vars.y2--;

      // 控制左右移动速度
      if (
        this.keyPressed("left arrow") ||
        this.keyPressed("a") ||
        (this.mouse.down && this.compare(this.x, this.mouse.x) > 0)
      ) {
        this.costume = "costume2";
        this.stage.vars.x -= 0.7 * playerSpeed;
      }
      if (
        this.keyPressed("right arrow") ||
        this.keyPressed("d") ||
        (this.mouse.down && this.compare(this.mouse.x, this.x) > 0)
      ) {
        this.costume = "costume1";
        this.stage.vars.x += 0.7 * playerSpeed;
      }

      this.stage.vars.x = this.toNumber(this.stage.vars.x) * 0.9;
      this.x += this.toNumber(this.stage.vars.x);

      // 处理平台碰撞逻辑
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y += 1;
      }
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y -= 4;
        this.x += this.toNumber(this.stage.vars.x) * -1;
        if (
          this.keyPressed("up arrow") ||
          this.keyPressed("w") ||
          this.keyPressed("enter") ||  // 小写 enter
          (this.mouse.down && this.compare(this.mouse.y, this.y) > 0)
        ) {
          this.handleJump();
        } else {
          this.stage.vars.x = 0;
        }
      }

      this.y += this.toNumber(this.stage.vars.y2);
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y += 0 - this.toNumber(this.stage.vars.y2);
        this.stage.vars.y2 = 1;
      }
      this.y -= 1;

      // 跳跃逻辑
      if (
        (this.keyPressed("up arrow") ||
          this.keyPressed("w") ||
          this.keyPressed("enter") ||  // 使用小写的 "enter"
          (this.mouse.down && this.compare(this.mouse.y, this.y) > 0)) &&
        this.touching(this.sprites["Platforms"].andClones())
      ) {
        this.handleJump(); // 调用跳跃逻辑
      }

      this.y += 1;
      if (this.compare(this.y, 180) > 0) {
        this.stage.vars.y2 = 0;
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
