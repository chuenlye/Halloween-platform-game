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
      yield* this.showScoreAndPrize("⏰きれ！");
    }
  
    *whenGameOver() {
      yield* this.showScoreAndPrize("FINISH！");
    }
  
    *showScoreAndPrize(messagePrefix) {
      const score = this.stage.vars.score;
      let prize = "";
      if (score >= 20) {
        prize = "１ とうしょう";
      } else if (score >= 10) {
        prize = "２ とうしょう";
      } else {
        prize = "３ とうしょう";
      }
      const message = `🤣 ${prize} 🤣`;
      const speakMessage = `おめでとう!! ${prize} ね`;
  
      // 停止背景音乐
      this.broadcast("StopMusic");
  
      const utterance = new SpeechSynthesisUtterance(speakMessage);
      utterance.lang = "ja-JP"; // 设置语言为日语
      speechSynthesis.speak(utterance);
  
      // 使用 Canvas 动态绘制文字
      const canvas = document.createElement("canvas");
      canvas.width = 480; // 舞台宽度
      canvas.height = 360; // 舞台高度
      const ctx = canvas.getContext("2d");
  
      // 设置背景为透明
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // 绘制半透明背景（可选）
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // 黑色，50% 透明度
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // 设置文字样式
      ctx.font = "bold 48px Arial"; // 调整文字大小和字体
      ctx.fillStyle = "white"; // 文字颜色
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
  
      // 绘制文字
      ctx.fillText(message, canvas.width / 2, canvas.height / 2);
  
      // 将 Canvas 转换为图片数据
      const imageData = canvas.toDataURL("image/png");
  
      // 创建新的 Costume，设置中心点为 Canvas 的中心
      const newCostume = new Costume("message", imageData, {
        x: canvas.width / 2,
        y: canvas.height / 2,
      });
  
      // 添加新的 Costume 并切换到它
      this.costumes.push(newCostume);
      this.costume = "message";
  
      // 显示角色
      this.visible = true;
      this.goto(0, 0);
  
      // 停留 5 秒，然后隐藏消息
      yield* this.wait(10);
  
      // 切换回空白的 Costume
      this.costume = "blank";
      this.visible = false;
    }
  }
