import {
    Sprite,
    Trigger,
    Costume,
  } from "https://unpkg.com/leopard@^1/dist/index.esm.js";
  
  export default class Message extends Sprite {
    constructor(...args) {
      super(...args);
  
      this.costumes = [
        new Costume("blank", "./Message/costumes/blank.svg", { x: 0, y: 0 }),
      ];
  
      this.sounds = [];
  
      this.triggers = [
        new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
        new Trigger(Trigger.BROADCAST, { name: "timeup" }, this.whenTimeUp),
        new Trigger(Trigger.BROADCAST, { name: "gameover" }, this.whenGameOver),
      ];
    }
  
    *whenGreenFlagClicked() {
      this.visible = false;
    }
  
    *whenTimeUp() {
      yield* this.showScoreAndPrize("時間切れ！");
    }
  
    *whenGameOver() {
      yield* this.showScoreAndPrize("FINISH！");
    }
  
    *showScoreAndPrize(messagePrefix) {
      this.visible = true;
      const score = this.stage.vars.score;
      let prize = "";
      if (score >= 20) {
        prize = "一等賞";
      } else if (score >= 10) {
        prize = "二等賞";
      } else {
        prize = "三等賞";
      }
      const message = `${messagePrefix}\n${prize} ね :D`;
      this.goto(0, 0);
      this.say(message);
      // 停留 5 秒，然后隐藏消息
      yield* this.wait(5);
      this.say("");
      this.visible = false;
    }
  }
