/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Platforms extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Platforms/costumes/01.svg", { x: 280, y: -151 }),
      new Costume("02", "./Platforms/costumes/02.svg", {
        x: 314,
        y: 134.594095,
      }),
      new Costume("03", "./Platforms/costumes/03.svg", {
        x: 314,
        y: -42.59167166666663,
      }),
      new Costume("04", "./Platforms/costumes/04.svg", {
        x: 314,
        y: -86.80003499999998,
      }),
      new Costume("05", "./Platforms/costumes/05.svg", {
        x: 314,
        y: -11.80006499999999,
      }),
      new Costume("06", "./Platforms/costumes/06.svg", {
        x: 314,
        y: -34.577815000000015,
      }),
      new Costume("07", "./Platforms/costumes/07.svg", {
        x: 314,
        y: -94.800025,
      }),
      new Costume("08", "./Platforms/costumes/08.svg", {
        x: 314,
        y: 223.1999969482422,
      }),
      new Costume("09", "./Platforms/costumes/09.svg", {
        x: 314,
        y: 14.422184999999985,
      }),
      new Costume("10", "./Platforms/costumes/10.svg", { x: 240, y: -37.5 }),
      new Costume("11", "./Platforms/costumes/11.svg", {
        x: 318,
        y: 304.19995500000005,
      }),
      new Costume("12", "./Platforms/costumes/12.svg", {
        x: 314,
        y: 125.199975,
      }),
      new Costume("13", "./Platforms/costumes/13.svg", {
        x: 314,
        y: -20.80007500000002,
      }),
      new Costume("14", "./Platforms/costumes/14.svg", {
        x: 272,
        y: 268.9999969482424,
      }),
    ];

    this.sounds = [new Sound("Plopp", "./Platforms/sounds/Plopp.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "levelup" },
        this.whenIReceiveLevelup
      ),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenIReceiveEnd() {}

  *whenGreenFlagClicked() {
    this.visible = true;
    this.moveAhead();
    this.costume = 1;
  }

  *whenIReceiveLevelup() {
    this.costumeNumber++;
  }

  *whenIReceiveNow() {}
}
