import { Ticker } from "@pixi/ticker";
import { random } from "../util";
import UIController from "./ui.controller";

export default class AppController {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    this.uiController = new UIController(this.model);

    this.view.bindAddShapeHandler(({ x, y }) => {
      this.model.addShape({ x, y });
    });

    this.view.bindClickShapeHandler((id) => {
      const shape = this.model.getShapeById(id);
      this.model.removeShape(shape);
      this.model.changeSameShapesColor(shape);
    });

    this._ticker = Ticker.shared.add(this.tick, this);
    this._timer = Date.now();
  }

  tick() {
    const containerSize = this.view.backgroundSize;
    const now = Date.now();

    this.model.moveShapes({
      width: containerSize.width,
      height: containerSize.height,
    });

    if (now - this._timer > 1000) {
      this._timer = now;

      for (let i = 0; i < this.model.shapesPerSecond; i++) {
        const shape = this.model.addShape();
        const shapeBounds = shape.getBounds();
        shape.x = random(0, containerSize.width);
        shape.y = -shapeBounds.height;
      }
    }
  }
}
