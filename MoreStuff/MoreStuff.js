/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MoreStuff extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./MoreStuff/costumes/costume1.svg", {
        x: 14.999999999999972,
        y: 15,
      }),
    ];

    this.sounds = [new Sound("pop", "./MoreStuff/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.effects.clear();
    while (true) {
      this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.direction = this.random(1, 360);
    this.effects.color = this.random(1, 200);
    for (let i = 0; i < 20; i++) {
      this.move(5);
      this.effects.ghost += 5;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveNow() {}
}
