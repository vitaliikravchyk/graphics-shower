import { Graphics } from "@pixi/graphics";
import { shapeSizeLimit } from "../../constants";

/*
  Generic Grphics class for shapes that contain basic properties 
*/
export default class Shape extends Graphics {
  constructor({
    id = Date.now(),
    color = 0xffffff,
    width = shapeSizeLimit.min,
    height = shapeSizeLimit.min,
  }) {
    super();
    this.id = id;
    this.isShape = true;
    this.tint = color;
    this.size = {
      width,
      height,
    };
    this.interactive = true;
  }
}
