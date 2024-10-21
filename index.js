import {
  Project,
  Sprite,  // 保留 Sprite 的导入
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
const playerSpeed = 1;  // 设置前进速度

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
    playerSpeed: playerSpeed  // 直接将 playerSpeed 作为 Player 实例的属性
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
let isGameOver = false;     // 标记游戏是否结束
let touchedSpikes = false;  // 标记是否碰到了尖刺

document.addEventListener("keydown", function (event) {
  console.log('Key pressed:', event.key);  // 调试日志

  if (event.key === "Enter") {
    if (!isGameStarted) {
      isGameStarted = true;  // 开始游戏
      gameLoop();  // 开始游戏循环
    }
  }
});

// 游戏循环逻辑
function gameLoop() {
  if (isGameOver) return;  // 如果游戏结束，停止循环

  sprites.Player.x += sprites.Player.playerSpeed;  // 玩家自动前进

  if (checkCollision(sprites.Player, sprites.Spikes)) {
    touchedSpikes = true; // 玩家碰到了尖刺
    allowJumpToSurvive(); // 允许跳跃逃生
  } else {
    requestAnimationFrame(gameLoop);  // 继续游戏循环
  }
}

// 检测碰撞后的跳跃机会
function allowJumpToSurvive() {
  setTimeout(() => {
    if (touchedSpikes) {
      isGameOver = true;  // 如果玩家没有跳跃，游戏结束
      resetGame();        // 重置游戏
    }
  }, 1000);  // 给玩家1秒时间跳跃
}

// 碰撞检测函数
function checkCollision(player, obstacle) {
  // 检查 obstacle 的 width 和 height 是否定义
  if (!obstacle || !obstacle.width || !obstacle.height) {
    return false;
  }

  // 调整碰撞检测，确保物体接触而不重合
  const collision = (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
  );

  if (collision) {
    // 当接触时，让玩家停止自动前进，避免重合
    sprites.Player.x = obstacle.x - player.width;  // 确保玩家在障碍物的左侧
  }

  return collision;
}

// 游戏重置函数
function resetGame() {
  setTimeout(() => {
    window.location.reload();  // 延迟后刷新页面
  }, 1000);
}

export default project;
