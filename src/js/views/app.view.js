import { Graphics } from "@pixi/graphics";

export default class AppView {
  constructor({ app, model }) {
    this.app = app;
    this.model = model;

    this._background = this._createBackground();

    this.app.stage.addChild(this._background);

    this.model.subscribe(this.model.eventTypes.addShape, (shape) => {
      this._renderShape(shape);
    });

    this.model.subscribe(this.model.eventTypes.removeShape, (shape) => {
      this._removeShape(shape);
    });
  }

  bindAddShapeHandler(handler) {
    this._background.on("pointerdown", (event) => {
      const { x, y } = event.data.global;
      handler({ x, y });
    });
  }

  bindClickShapeHandler(handler) {
    this.app.stage.on("pointerdown", (event) => {
      const { target } = event;
      if (target.isShape) {
        handler(target.id);
      }
    });
  }

  get backgroundSize() {
    return this._background.getBounds();
  }

  _createBackground() {
    const backgroundShape = new Graphics()
      .beginFill(0x1099bb)
      .drawRect(0, 0, this.app.screen.width, this.app.screen.height)
      .endFill();
    backgroundShape.interactive = true;

    return backgroundShape;
  }

  _renderShape(shape) {
    this.app.stage.addChild(shape);
  }

  _removeShape(shape) {
    this.app.stage.removeChild(shape);
  }
}
