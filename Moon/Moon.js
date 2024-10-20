/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Moon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Moon/costumes/costume1.svg", {
        x: 86.21679499999999,
        y: 81.869725,
      }),
    ];

    this.sounds = [new Sound("pop", "./Moon/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenGreenFlagClicked() {
    this.moveBehind();
    this.visible = true;
    this.goto(218, 160);
    this.size = 100;
    while (true) {
      for (let i = 0; i < 40; i++) {
        this.size += 0.4;
        yield;
      }
      for (let i = 0; i < 40; i++) {
        this.size -= 0.4;
        yield;
      }
      yield;
    }
  }

  *whenIReceiveNow() {}
}
