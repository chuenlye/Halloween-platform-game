import {
  Project,
  Sprite,
  Trigger  // 添加对 Trigger 的导入
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";
import Stage from "./Stage/Stage.js";
import Platforms from "./Platforms/Platforms.js";
import Spikes from "./Spikes/Spikes.js";
import HarryPotter from "./HarryPotter/HarryPotter.js";
import Effects from "./Effects/Effects.js";
import Particals from "./Particals/Particals.js";
import MoreStuff from "./MoreStuff/MoreStuff.js";
import PlayerLight from "./PlayerLight/PlayerLight.js";
import Player from "./Player/Player.js";
import Moon from "./Moon/Moon.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Platforms: new Platforms({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 14,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
  Spikes: new Spikes({
    x: 36.00000000000001,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 14,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  HarryPotter: new HarryPotter({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 90,
    visible: true,
    layerOrder: 3,
  }),
  Effects: new Effects({
    x: -174.625,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  Particals: new Particals({
    x: 240,
    y: -81,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
  MoreStuff: new MoreStuff({
    x: -180,
    y: -105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5,
  }),
  PlayerLight: new PlayerLight({
    x: 0,
    y: -0.0003410054661117101,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 109.06307787,
    visible: false,
    layerOrder: 6,
  }),
  Player: new Player({
    x: -180,
    y: -105,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 65,
    visible: false,
    layerOrder: 8,
  }),
  Moon: new Moon({
    x: 218,
    y: 160,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 102,
    visible: true,
    layerOrder: 2,
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30,  // 帧率控制游戏速度
});

let isGameStarted = false;  // 标记游戏是否已经开始

document.addEventListener("keydown", function (event) {
  console.log('Key pressed:', event.key);  // 调试日志

  if (event.key === "Enter") {
    if (!isGameStarted) {
      isGameStarted = true;  // 标记游戏已经开始
    }
    // 每次按下 Enter 键，注册跳跃
    sprites.Player.registerJump();
  }
});

export default project;
