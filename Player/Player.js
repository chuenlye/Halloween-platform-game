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
      new Trigger(Trigger.BROADCAST, { name: "Jump" }, this.handleJump), // 注册跳跃的广播
      new Trigger(Trigger.BROADCAST, { name: "levelup" }, this.handleLevelUp), // 关卡切换后重置
    ];

    this.isJumping = false;  // 标记是否正在跳跃
    this.canJump = true;     // 标记是否可以跳跃
    this.jumpCount = 0;      // 记录按下 Enter 键的次数
    this.jumpTimeout = null; // 用于计时连击的超时
    this.levelUpTriggered = false; // 关卡切换标志
  }

  // 跳跃处理，使用 glide 实现平滑跳跃，根据按键次数控制跳跃大小
  *handleJump() {
    console.log("Jumping Handler! Jump count: " + this.jumpCount);
    if (this.canJump && !this.isJumping) {
      this.isJumping = true;
      this.canJump = false;

      // 根据 jumpCount 设置跳跃的距离和高度
      let xMove = 40; // 基础跳跃距离
      let yMove = 80; // 基础跳跃高度

      if (this.jumpCount === 2) {  // 双击跳跃
        console.log("Double jump!");
        xMove = 70;
        yMove = 120;
      } else if (this.jumpCount >= 3) {  // 三连击跳跃
        console.log("Triple jump!");
        xMove = 100;
        yMove = 150;
      }

      // 通过 glide 实现跳跃，先向上跳，再向下落
      yield* this.glide(0.3, this.x + xMove, this.y + yMove); // 向右跳跃并向上
      yield* this.glide(0.5, this.x + xMove, this.y - yMove); // 向右移动并下落

      this.isJumping = false;
      this.canJump = true;  // 落地后恢复跳跃能力
      this.jumpCount = 0;   // 重置跳跃次数
    }
  }

  *whenGreenFlagClicked() {
    this.size = 65;
    this.moveAhead();
    this.costume = "costume1";
    this.effects.ghost = 0;
    this.visible = true;
    this.goto(-180, -110); // 初始位置
    this.stage.vars.level = 1; // 重置关卡为1
    this.levelUpTriggered = false; // 初始化关卡切换标志

    while (true) {
      // 检测是否碰到平台
      if (this.touching(this.sprites["Platforms"].andClones())) {
        console.log("Touching platform!");

        // 获取平台 costume 的中心位置，并使用它调整 player 的位置
        const platformCostume = this.sprites["Platforms"].costume;
        const platformCenterY = platformCostume.center.y;  // 获取平台 costume 的中心 y
        const platformY = this.sprites["Platforms"].y;

        // 将 Player 置于平台的顶部
        this.y = platformY + platformCenterY + this.size / 2;

        this.isJumping = false;  // 允许再次跳跃
        this.canJump = true;     // 恢复跳跃能力
        this.stage.vars.y2 = 0;  // 重置下落速度
      }

      // 检测是否碰到尖刺
      if (this.touching(this.sprites["Spikes"].andClones())) {
        console.log("Hit spikes!");
        this.goto(-180, -110); // 重新回到初始位置
        this.broadcast("dead"); // 触发死亡事件
      }

      // 检测玩家是否到达屏幕右边缘，进入下一关
      if (this.compare(this.x, 246) > 0 && !this.levelUpTriggered) {
        console.log("Level up!");
        this.levelUpTriggered = true; // 标记为已触发
        this.stage.vars.level++; // 增加关卡
        this.broadcast("levelup"); // 触发进入下一关的事件
        yield* this.wait(1); // 确保不会重复触发
      }

      // 达到第15关，游戏结束
      if (this.toNumber(this.stage.vars.level) === 15) {
        console.log("Game Over! Reached level 15");
        this.broadcast("end"); // 广播游戏结束事件
      }

      yield;
    }
  }

  *handleLevelUp() {
    this.goto(-180, -110); // 每次关卡切换后重置 Player 的位置
    this.isJumping = false;
    this.canJump = true;
    this.jumpCount = 0;
    this.levelUpTriggered = false; // 允许下一个关卡触发
  }

  // 记录按键次数并决定跳跃大小
  registerJump() {
    if (!this.isJumping) {
      this.jumpCount++;  // 每次按下 Enter 键增加计数
      console.log("Jump count: " + this.jumpCount);

      // 清除已有的超时计时器，重设新的超时
      if (this.jumpTimeout) {
        clearTimeout(this.jumpTimeout);
      }

      // 设置超时，若在 0.5 秒内没有新的按键，则执行跳跃
      this.jumpTimeout = setTimeout(() => {
        this.broadcast("Jump");  // 广播跳跃事件
      }, 500);
    }
  }
}
