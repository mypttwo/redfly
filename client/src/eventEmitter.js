export const DATA_LOADED_EVENT = "blockChainDataLoaded";

const EventEmitter = {
  _events: {},
  publish: function (event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach((callback) => callback(data));
  },
  subscribe: function (event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
};

export default EventEmitter;
