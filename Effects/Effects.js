/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Effects extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Fog", "./Effects/costumes/Fog.svg", {
        x: 399,
        y: 214.07173887892358,
      }),
    ];

    this.sounds = [new Sound("pop", "./Effects/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "next level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "End" }, this.whenIReceiveEnd),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    while (true) {
      this.moveBehind();
      this.effects.ghost = 50;
      this.goto(0, 0);
      yield* this.glide(8, -500, 0);
      yield;
    }
  }

  *whenIReceiveNextLevel() {
    /* TODO: Implement stop other scripts in sprite */ null;
    while (true) {
      this.moveBehind();
      this.effects.ghost = 50;
      this.goto(0, 0);
      yield* this.glide(5, -500, 0);
      yield;
    }
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveNow() {}
}
