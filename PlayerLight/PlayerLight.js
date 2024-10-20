/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PlayerLight extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./PlayerLight/costumes/costume1.svg", {
        x: 58.724999999999966,
        y: 58.72500000000002,
      }),
      new Costume("costume2", "./PlayerLight/costumes/costume2.svg", {
        x: 78.30000000000007,
        y: 78.29999999999993,
      }),
      new Costume("costume3", "./PlayerLight/costumes/costume3.svg", {
        x: 91.46249999999998,
        y: 91.46249999999995,
      }),
      new Costume("costume4", "./PlayerLight/costumes/costume4.svg", {
        x: 103.94999999999993,
        y: 103.95000000000007,
      }),
    ];

    this.sounds = [new Sound("pop", "./PlayerLight/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];

    this.vars.size = 67;
    this.vars.clone = 4;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.vars.size = 0;
    this.vars.clone = 1;
    this.createClone();
    this.vars.size = 22;
    this.vars.clone = 2;
    this.createClone();
    this.vars.size = 45;
    this.vars.clone = 3;
    this.createClone();
    this.vars.size = 67;
    this.vars.clone = 4;
    this.createClone();
  }

  *startAsClone() {
    this.visible = true;
    this.costume = this.vars.clone;
    while (true) {
      this.vars.size += 5;
      this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
      this.size =
        100 + Math.cos(this.degToRad(this.toNumber(this.vars.size))) * 10;
      this.effects.brightness =
        Math.sin(this.degToRad(this.toNumber(this.vars.size) * 3)) * 2;
      this.moveBehind();
      yield;
    }
  }

  *whenIReceiveNow() {}
}
