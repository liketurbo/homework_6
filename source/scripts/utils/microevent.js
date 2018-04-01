class MicroEvent {
  static mixin(destObject) {
    const props = ['bind', 'unbind', 'trigger'];

    for (const prop of props) {
      if (typeof destObject === 'function') {
        destObject.prototype[prop] = MicroEvent.prototype[prop];
      } else {
        destObject[prop] = MicroEvent.prototype[prop];
      }
    }
    return destObject;
  }

  bind(event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  }

  unbind(event, fct) {
    this._events = this._events || {};
    if (event in this._events === false) {
      return;
    }
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  }

  trigger(event, ...args) {
    this._events = this._events || {};

    if (event in this._events === false) {
      return;
    }
    for (const ch of this._events[event]) {
      ch.apply(this, Array.prototype.slice.call(args, 1));
    }
  }
}

export default MicroEvent;
