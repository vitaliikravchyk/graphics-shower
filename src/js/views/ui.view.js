import "../../styles/controllers.css";

export default class UIView {
  constructor(model) {
    this.model = model;

    this.gravity = document.querySelector("#gravity");
    this.shapesPerSecond = document.querySelector("#shapes-per-sec");
    this.gravityIncButton = document.querySelector("#gravity-increase");
    this.gravityDecButton = document.querySelector("#gravity-decrease");
    this.shapesPerSecondIncButton = document.querySelector(
      "#shapes-per-sec-increase"
    );
    this.shapesPerSecondDecButton = document.querySelector(
      "#shapes-per-sec-decrease"
    );

    this.areaInfo = document.querySelector("#area-info");
    this.numOfShapesInfo = document.querySelector(
      "#number-of-shapes-info"
    );

    this.model.subscribe(this.model.eventTypes.updateGravity, (gravity) => {
      this._updateGravity(gravity);
    });

    this.model.subscribe(
      this.model.eventTypes.updateShapesPerSecond,
      (shapesPerSecond) => {
        this._updateShapesPerSecond(shapesPerSecond);
      }
    );

    this.model.subscribe(
      this.model.eventTypes.updateNumberOfShapes,
      (numberOfShapes) => {
        this.numOfShapesInfo.innerHTML = `${numberOfShapes}`;
      }
    );

    this.model.subscribe(
      this.model.eventTypes.updateOccupiedArea,
      (occupiedArea) => {
        this.areaInfo.innerHTML = `${occupiedArea} px^2`;
      }
    );
  }

  bindIncreaseGravity(handler) {
    this.gravityIncButton.addEventListener("click", () => {
      handler();
    });
  }

  bindDecreaseGravity(handler) {
    this.gravityDecButton.addEventListener("click", () => {
      handler();
    });
  }

  bindIncreaseShapesPerSecond(handler) {
    this.shapesPerSecondIncButton.addEventListener("click", () => {
      handler();
    });
  }

  bindDecreaseShapesPerSecond(handler) {
    this.shapesPerSecondDecButton.addEventListener("click", () => {
      handler();
    });
  }

  _updateShapesPerSecond(value) {
    this.shapesPerSecond.value = value;
  }

  _updateGravity(value) {
    this.gravity.value = value;
  }
}
