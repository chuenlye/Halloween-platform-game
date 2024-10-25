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

    // 注册触发器
    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.startTimer),
    ];

    // 初始化变量
    this.vars.enterPressCount = 0;
    this.vars.enterPressTimer = 0;
    // 游戏变量将在 whenGreenFlagClicked 中初始化
  }

  *whenGreenFlagClicked() {
    // 初始化角色状态
    this.size = 65;
    this.moveAhead();
    this.costume = "costume1";
    this.effects.ghost = 0;
    this.visible = true;
    this.goto(-180, -50);
    this.direction = 90;

    // 初始化游戏变量
    this.stage.vars.level = 1;
    this.stage.vars.x = 0;
    this.stage.vars.y2 = 0;
    this.vars.enterPressCount = 0;
    this.vars.enterPressTimer = 0;
    this.stage.vars.score = 0;
    this.stage.vars.timer = 20;
    this.stage.vars.gameOver = false;

    while (!this.stage.vars.gameOver) {
      // 应用重力
      this.stage.vars.y2--;

      // 检测 Enter 键的按下
      if (this.keyPressed("enter")) {
        if (this.vars.enterPressTimer === 0) {
          // 第一次按下，启动计时器
          this.vars.enterPressCount = 1;
          this.vars.enterPressTimer = 10; // 调整计时器时间
        } else {
          // 计时器正在运行，增加按键计数
          this.vars.enterPressCount++;
          this.vars.enterPressTimer = 10; // 重置计时器
        }
      }

      // 计时器递减
      if (this.vars.enterPressTimer > 0) {
        this.vars.enterPressTimer--;
        if (this.vars.enterPressTimer === 0) {
          // 根据按键次数设置速度
          this.stage.vars.x = 2 * this.vars.enterPressCount;
          this.stage.vars.y2 = 4 * this.vars.enterPressCount;
          this.vars.enterPressCount = 0;
        }
      }

      // 应用水平速度
      this.stage.vars.x = this.toNumber(this.stage.vars.x) * 0.9;
      this.x += this.toNumber(this.stage.vars.x);

      // 碰撞检测和位置调整（保持原有逻辑）
      for (let i = 0; i < 4; i++) {
        if (this.touching(this.sprites["Platforms"].andClones())) {
          this.y += 1;
        }
      }
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y -= 4;
        this.x += this.toNumber(this.stage.vars.x) * -1;
        this.stage.vars.x = 0;
      }

      // 垂直运动和碰撞检测（保持原有逻辑）
      this.y += this.toNumber(this.stage.vars.y2);
      if (this.touching(this.sprites["Platforms"].andClones())) {
        this.y -= this.toNumber(this.stage.vars.y2);
        this.stage.vars.y2 = 1;
      }
      this.y -= 1;

      // 防止角色飞出屏幕上方
      if (this.compare(this.y, 180) > 0) {
        this.stage.vars.y2 = 0;
      }

      // 检测是否掉出屏幕下方
      if (this.y < -180) {
        this.broadcast("dead");
        // 重置位置
        this.goto(-180, -50);
        this.stage.vars.x = 0;
        this.stage.vars.y2 = 0;
        this.vars.enterPressCount = 0;
        this.vars.enterPressTimer = 0;
      }

      yield;
    }

    // 游戏结束后，隐藏角色
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (!this.stage.vars.gameOver) {
      if (this.touching(this.sprites["Spikes"].andClones())) {
        this.broadcast("dead");
        // 重置位置
        this.goto(-180, -50);
        this.stage.vars.x = 0;
        this.stage.vars.y2 = 0;
        this.vars.enterPressCount = 0;
        this.vars.enterPressTimer = 0;
      }
      if (this.x > 246) {
        this.goto(-180, -50);
        this.broadcast("levelup");
        this.stage.vars.level++;
        this.stage.vars.score += 10; // 过关加10分
        console.log("进入下一关：" + this.stage.vars.level);
      }
      if (this.stage.vars.level >= 4) {
        this.stage.vars.gameOver = true;
        this.broadcast("gameover");
      }
      yield;
    }
  }

  *startTimer() {
    while (this.stage.vars.timer > 0 && !this.stage.vars.gameOver) {
      yield* this.wait(1);
      this.stage.vars.timer--;
    }
    if (!this.stage.vars.gameOver) {
      this.stage.vars.gameOver = true;
      this.broadcast("timeup");
    }
  }
}
