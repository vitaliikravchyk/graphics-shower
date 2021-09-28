import UIView from "../views/ui.view";

export default class UIController {
  constructor(model ) {
    this.model = model;
    this.view = new UIView(this.model);

    this.view.bindIncreaseGravity(() => {
      this.model.increaseGravity()
    })
  
    this.view.bindDecreaseGravity(() => {
      this.model.decreaseGravity()
    })
  
    this.view.bindIncreaseShapesPerSecond(() => {
      this.model.increaseShapesPerSecond()
    })
  
    this.view.bindDecreaseShapesPerSecond(() => {
      this.model.decreaseShapesPerSecond()
    })
  }
}
