import { utils } from "pixi.js";

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function generateRandomHexColor() {
  const hexadecimal = utils.rgb2hex([
    random(0, 255) / 255,
    random(0, 255) / 255,
    random(0, 255) / 255,
  ]);
  return `0x${hexadecimal.toString(16)}`;
}

export function polygonArea (polygon){
  let total = 0;
  for (let i = 0; i < polygon.length; i++) {
      const addX = polygon[i].x;
      const addY = polygon[i === polygon.length - 1 ? 0 : i + 1].y;
      const subX = polygon[i === polygon.length - 1 ? 0 : i + 1].x;
      const subY = polygon[i].y;
      total += (addX * addY * 0.5) - (subX * subY * 0.5);
  }
  return Math.abs(total);
}

export { default as PubSub } from "./PubSub";
