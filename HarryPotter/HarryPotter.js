/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class HarryPotter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Harry P black", "./HarryPotter/costumes/Harry P black.svg", {
        x: 322,
        y: 247.66972805175777,
      }),
    ];

    this.sounds = [new Sound("meow", "./HarryPotter/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
