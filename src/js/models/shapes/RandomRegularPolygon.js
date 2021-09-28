import { Point } from "@pixi/math";
import { polygonArea, random } from "../../util";
import Shape from "./Shape";

/*
  RandomRegularShape draws polygon with random sides amount. Sides are all the same length and are symmetrically placed about a common center.
*/
export default class RandomRegularPolygon extends Shape {
  constructor({ id, color, width, height }) {
    super({ id, color, width, height });

    this.sides = random(3, 9);
    this.radius = this.size.width / 2;
    this.points = this.getRegularPolygonPoints(this.radius, this.sides);
    this.beginFill(0xffffff).drawPolygon(this.points).endFill();
  }

  getRegularPolygonPoints(radius, sides, rotation = 0) {
    sides = Math.max(sides | 0, 3);
    const startAngle = (-1 * Math.PI) / 2 + rotation;
    const delta = (Math.PI * 2) / sides;
    const polygon = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      polygon.push(
        new Point(radius * Math.cos(angle), radius * Math.sin(angle))
      );
    }
    return polygon;
  }

  get area() {
    return polygonArea(this.points);
  }
}
