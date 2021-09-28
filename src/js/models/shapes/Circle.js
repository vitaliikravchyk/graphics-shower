import Shape from "./Shape";

/*
  RandomPolygon draws simple circle.
*/
export default class Circle extends Shape {
  constructor({ id, color, width, height }) {
    super({ id, color, width, height });

    this.radius = this.size.width / 2;
    this.beginFill(0xffffff).drawCircle(0, 0, this.radius).endFill();
  }

  get area() {
    return Math.PI * Math.pow(this.radius / 2, 2);
  }
}
