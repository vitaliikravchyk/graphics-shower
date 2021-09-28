export default class PubSub {
  constructor() {
    this._subscribers = {};
  }

  subscribe(eventName, handler) {
    if (!Array.isArray(this._subscribers[eventName])) {
      this._subscribers[eventName] = [];
    }
    this._subscribers[eventName].push(handler);
  }

  unsubscribe(eventName, handler) {
    if (!Array.isArray(this._subscribers[eventName])) return;

    this._subscribers[eventName] = this._subscribers[eventName].filter(
      (subscribedHandler) => subscribedHandler !== handler
    );
  }

  publish(eventName, data) {
    if (!Array.isArray(this._subscribers[eventName])) return;

    this._subscribers[eventName].forEach((handler) => {
      handler(data);
    });
  }
}
