/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Spikes extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Spikes/costumes/01.svg", {
        x: 88.79167000000001,
        y: -120.48751499999992,
      }),
      new Costume("02", "./Spikes/costumes/02.svg", {
        x: 27.666680000000014,
        y: -22.800054999999986,
      }),
      new Costume("03", "./Spikes/costumes/03.svg", {
        x: 107.66667000000001,
        y: -10.800065000000018,
      }),
      new Costume("04", "./Spikes/costumes/04.svg", {
        x: 166.66667,
        y: -107.80003499999998,
      }),
      new Costume("05", "./Spikes/costumes/05.svg", {
        x: -14.77082999999999,
        y: 19.19995499999999,
      }),
      new Costume("06", "./Spikes/costumes/06.svg", {
        x: 145.66667,
        y: -93.80003500000004,
      }),
      new Costume("07", "./Spikes/costumes/07.svg", {
        x: 145.66667,
        y: -108.80003499999998,
      }),
      new Costume("08", "./Spikes/costumes/08.svg", {
        x: 113.66667000000001,
        y: 195.699965,
      }),
      new Costume("09", "./Spikes/costumes/09.svg", {
        x: 196.66667,
        y: -107.80003499999998,
      }),
      new Costume("10", "./Spikes/costumes/10.svg", {
        x: 151.66667,
        y: -42.604814999999974,
      }),
      new Costume("11", "./Spikes/costumes/11.svg", {
        x: 113.66667000000002,
        y: 193.199965,
      }),
      new Costume("12", "./Spikes/costumes/12.svg", {
        x: 142.66664500000002,
        y: 112.699925,
      }),
      new Costume("13", "./Spikes/costumes/13.svg", {
        x: 207.66667,
        y: 9.19996500000002,
      }),
      new Costume("costume1", "./Spikes/costumes/costume1.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [new Sound("Plopp", "./Spikes/sounds/Plopp.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "levelup" },
        this.whenIReceiveLevelup
      ),
      new Trigger(Trigger.BROADCAST, { name: "Now" }, this.whenIReceiveNow),
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.visible = true;
    this.costume = 1;
  }

  *whenIReceiveLevelup() {
    this.costumeNumber++;
  }

  *whenIReceiveNow() {}
}
