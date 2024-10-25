import {
  Project,
  Sprite,
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
import Message from "./Message/Message.js";


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
  }),
  Message: new Message({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});

export default project;
