import Shape from "./Shape";

/*
  RandomPolygon draws simple ellipse.
*/
export default class Ellipse extends Shape {
  constructor({id, color, width, height}) {
    super({id, color, width, height});

    this.beginFill(0xffffff)
      .drawEllipse(0, 0, this.size.width / 2, this.size.height / 2)
      .endFill();
  }

  get area() {
    return Math.PI * this.size.width * this.size.height;
  }
}
