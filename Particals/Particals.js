/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particals extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Particals/costumes/costume1.png", {
        x: 38,
        y: 34,
      }),
      new Costume("costume2", "./Particals/costumes/costume2.svg", {
        x: 18,
        y: 16,
      }),
    ];

    this.sounds = [
      new Sound("pop", "./Particals/sounds/pop.wav"),
      new Sound("car passing", "./Particals/sounds/car passing.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.wait(0.1);
    this.stage.vars.gameyo = "false";
    yield* this.resetghosting();
    while (true) {
      if (this.toString(this.stage.vars.gameyo) === "false") {
        this.createClone();
      } else {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *resetghosting() {
    this.effects.ghost = 100;
  }

  *startAsClone() {
    this.costume = this.random(1, 2);
    this.moveBehind(100);
    yield* this.resetghosting();
    this.visible = true;
    this.goto(this.random(-240, 240), this.random(-180, 180));
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 4;
      this.move(-1);
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.move(-1);
      this.direction += 15;
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.move(1);
      this.direction += 15;
      yield;
    }
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 4;
      this.move(1);
      yield;
    }
    this.deleteThisClone();
  }

  *fadeInOrOutSpeed(inorout, speed) {
    if (this.toString(inorout) === "in") {
      for (let i = 0; i < this.toNumber(speed); i++) {
        this.effects.ghost -= 10;
        yield;
      }
    }
    if (this.toString(inorout) === "out") {
      for (let i = 0; i < this.toNumber(speed); i++) {
        this.effects.ghost += 10;
        yield;
      }
    }
  }

  *whenIReceiveNow() {}
}
