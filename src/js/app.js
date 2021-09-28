import "../styles/index.css";
import * as PIXI from "pixi.js";
import AppController from "./controllers/app.controller";
import AppModel from "./models/app.model";
import AppView from "./views/app.view";

const app = new PIXI.Application({
  view: document.querySelector("#canvas"),
});
app.stage.interactive = true;

const model = new AppModel();
const view = new AppView({ app, model });
new AppController({ view, model });
