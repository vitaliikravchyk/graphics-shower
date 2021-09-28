import { polygonArea, random } from "../../util";
import Shape from "./Shape";

/*
  RandomPolygon draws polygon with random sides amount. All verticies are in random length from center.
*/
export default class RandomPolygon extends Shape {
  constructor({ id, color, width, height }) {
    super({ id, color, width, height });

    this.pointsAmount = random(3, 14);
    this.radius = this.size.width / 2;
    this.points = this.getRandomPolygonPoints(this.pointsAmount, this.radius);
    this.beginFill(0xffffff).drawPolygon(this.points).endFill();
  }

  getRandomPolygonPoints(sides, radius) {
    sides = Math.max(sides | 0, 3);
    const startAngle = (-1 * Math.PI) / 2;
    const delta = (Math.PI * 2) / sides;
    const polygonPoints = [];

    for (let i = 0; i < sides; i++) {
      const angle = i * delta + startAngle;
      const randomRadius = random(radius, radius * 2);
      polygonPoints.push({
        x: randomRadius * Math.cos(angle),
        y: randomRadius * Math.sin(angle),
      });
    }

    return polygonPoints;
  }

  get area() {
    return polygonArea(this.points);
  }
}
