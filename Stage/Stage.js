/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360,
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound(
        "Lost In The Woods - PaulRHJT",
        "./Stage/sounds/Lost In The Woods - PaulRHJT.wav"
      ),
      new Sound("trap king", "./Stage/sounds/trap king.mp3"),
      new Sound(
        "halloween-background-music-royalty-free-instrumental-music-for-videos",
        "./Stage/sounds/halloween-background-music-royalty-free-instrumental-music-for-videos.mp3"
      ),
      new Sound(
        "Lost In The Woods - PaulRHJT2",
        "./Stage/sounds/Lost In The Woods - PaulRHJT2.wav"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];

    this.vars.x = 0;
    this.vars.level = 1;
    this.vars.gameyo = "false";
    this.vars.y2 = 0;
  }

  *whenIReceiveNow() {}

  *whenGreenFlagClicked() {
    this.costume = "backdrop2";
    while (true) {
      yield* this.playSoundUntilDone("Lost In The Woods - PaulRHJT");
      yield;
    }
  }
}
