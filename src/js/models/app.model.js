import { generateRandomHexColor, PubSub } from "../util";
import ShapesModel from "./shapes.model";

/*
  Application model that store data and publish event for all subscribers(views). Events dispatch to notify when model data changed 
*/
export default class AppModel {
  constructor() {
    this._gravity = 1;
    this._shapesPerSecond = 1;

    this.eventTypes = {
      addShape: "addShape",
      removeShape: "removeShape",
      updateInfo: "updateInfo",
      updateGravity: "updateGravity",
      updateShapesPerSecond: "updateShapesPerSecond",
      updateNumberOfShapes: "updateNumberOfShapes",
      updateOccupiedArea: "updateOccupiedArea",
    };
    this._eventManager = new PubSub();

    this._shapesModel = new ShapesModel();
  }

  addShape({ x = 0, y = 0 } = {}) {
    const addedShape = this._shapesModel.add({ x, y });
    addedShape.renderable = y > 0 ? true : false;

    this._publish(
      this.eventTypes.updateNumberOfShapes,
      this._shapesModel.visibleShapes.length
    );
    this._publish(this.eventTypes.updateOccupiedArea, this.occupiedArea);
    this._publish(this.eventTypes.addShape, addedShape); // notify subscribers what shape was added
    return addedShape;
  }

  removeShape(shape) {
    this._shapesModel.remove(shape);

    this._publish(
      this.eventTypes.updateNumberOfShapes,
      this._shapesModel.visibleShapes.length
    );
    this._publish(this.eventTypes.updateOccupiedArea, this.occupiedArea);
    this._eventManager.publish(this.eventTypes.removeShape, shape); // notify subscribers what shape was removed
  }

  moveShapes(containerSize) {
    this._shapesModel.shapes.forEach((shape) => {
      shape.y += this._gravity;

      const shapeBounds = shape.getBounds();

      if (shapeBounds.y > containerSize.height) {
        this.removeShape(shape);
      }

      if (!shape.renderable && shapeBounds.bottom > 0) {
        shape.renderable = true;
      }
    });
  }

  changeSameShapesColor(shape) {
    const sameInstanceShapes = this._shapesModel.visibleShapes.filter(
      (s) => Object.getPrototypeOf(s) === Object.getPrototypeOf(shape)
    );
    let sameTypeShapes = [...sameInstanceShapes];

    if (shape.points) {
      sameTypeShapes = sameInstanceShapes.filter(
        (s) => s.points.length === shape.points.length
      );
    }

    sameTypeShapes.forEach((shape) => {
      shape.tint = generateRandomHexColor();
    });
  }

  getShapeById(id) {
    return this._shapesModel.shapes.find((shape) => shape.id === id);
  }

  increaseGravity() {
    this._gravity++;
    this._publish(this.eventTypes.updateGravity, this._gravity);
  }

  decreaseGravity() {
    if (this._gravity === 0) return;
    this._gravity--;
    this._publish(this.eventTypes.updateGravity, this._gravity);
  }

  increaseShapesPerSecond() {
    this._shapesPerSecond++;
    this._publish(this.eventTypes.updateShapesPerSecond, this._shapesPerSecond);
  }

  decreaseShapesPerSecond() {
    if (this._shapesPerSecond === 0) return;
    this._shapesPerSecond--;
    this._publish(this.eventTypes.updateShapesPerSecond, this._shapesPerSecond);
  }

  subscribe(eventName, handler) {
    if (this.eventTypes[eventName]) {
      this._eventManager.subscribe(eventName, handler);
    }
  }

  unsubscribe(eventName, handler) {
    if (this.eventTypes[eventName]) {
      this._eventManager.unsubscribe(eventName, handler);
    }
  }

  _publish(eventName, data) {
    this._eventManager.publish(eventName, data);
  }

  get shapesPerSecond() {
    return this._shapesPerSecond;
  }

  get occupiedArea() {
    return Math.ceil(
      this._shapesModel.visibleShapes.reduce(
        (prev, curr) => prev + curr.area,
        0
      )
    );
  }
}
