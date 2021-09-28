import { shapeSizeLimit } from "../constants";
import { generateRandomHexColor, random } from "../util";
import { Circle, Ellipse, RandomRegularPolygon, RandomPolygon } from "./shapes";

/*
  ShapeModel manage shapes data and provides methods to manipulate shapes
*/
export default class ShapesModel {
  constructor() {
    this._shapes = [];
    this._shapeClasses = [Circle, Ellipse, RandomRegularPolygon, RandomPolygon];
  }

  create() {
    const id = this._generateId();
    const color = generateRandomHexColor();
    const width = random(shapeSizeLimit.min, shapeSizeLimit.max);
    const height = random(shapeSizeLimit.min, shapeSizeLimit.max);
    const ShapeClass =
      this._shapeClasses[random(0, this._shapeClasses.length - 1)];
    return new ShapeClass({ id, color, width, height });
  }

  add({ x, y }) {
    const shape = this.create();
    shape.angle = random(0, 360);
    shape.x = x;
    shape.y = y;
    this._shapes.push(shape);
    return shape;
  }

  remove(shape) {
    shape.destroy();
    this._shapes = this._shapes.filter((s) => s.id !== shape.id);
  }

  _generateId() {
    const shapesLength = this._shapes.length;
    return shapesLength > 0 ? this._shapes[shapesLength - 1].id + 1 : 0;
  }

  get shapes() {
    return this._shapes;
  }

  get visibleShapes() {
    return this._shapes.filter((shape) => shape.renderable);
  }
}
