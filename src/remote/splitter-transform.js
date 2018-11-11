"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitterTransform = void 0;

var _os = _interopRequireDefault(require("os"));

var _stream = require("stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

class SplitterTransform extends _stream.Transform {
  constructor(...args) {
    super(...args);

    _buffer.set(this, {
      writable: true,
      value: null
    });
  }

  _transform(chunk, encoding, done) {
    _classPrivateFieldSet(this, _buffer, _classPrivateFieldGet(this, _buffer) ? Buffer.concat([_classPrivateFieldGet(this, _buffer), chunk]) : chunk);

    let index;

    while ((index = _classPrivateFieldGet(this, _buffer).indexOf(_os.default.EOL)) !== -1) {
      this.push(_classPrivateFieldGet(this, _buffer).slice(0, ++index));

      _classPrivateFieldSet(this, _buffer, _classPrivateFieldGet(this, _buffer).length ? _classPrivateFieldGet(this, _buffer).slice(index) : null);
    }

    return void done();
  }

  _flush(done) {
    if (_classPrivateFieldGet(this, _buffer) && _classPrivateFieldGet(this, _buffer).length) {
      return void done(null, _classPrivateFieldGet(this, _buffer));
    }
  }

}

exports.SplitterTransform = SplitterTransform;

var _buffer = new WeakMap();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwbGl0dGVyLXRyYW5zZm9ybS5tanMiXSwibmFtZXMiOlsiU3BsaXR0ZXJUcmFuc2Zvcm0iLCJUcmFuc2Zvcm0iLCJfdHJhbnNmb3JtIiwiY2h1bmsiLCJlbmNvZGluZyIsImRvbmUiLCJCdWZmZXIiLCJjb25jYXQiLCJpbmRleCIsImluZGV4T2YiLCJvcyIsIkVPTCIsInB1c2giLCJzbGljZSIsImxlbmd0aCIsIl9mbHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUtBLE1BQU1BLGlCQUFOLFNBQWdDQyxpQkFBaEMsQ0FBMEM7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxhQUM5QjtBQUQ4QjtBQUFBOztBQUd4Q0MsRUFBQUEsVUFBVSxDQUFDQyxLQUFELEVBQVFDLFFBQVIsRUFBa0JDLElBQWxCLEVBQXdCO0FBQ2hDLHlDQUFlLHVDQUNYQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyx1QkFBQyxJQUFELFlBQWVKLEtBQWYsQ0FBZCxDQURXLEdBRVhBLEtBRko7O0FBSUEsUUFBSUssS0FBSjs7QUFJQSxXQUFPLENBQUNBLEtBQUssR0FBRyxxQ0FBYUMsT0FBYixDQUFxQkMsWUFBR0MsR0FBeEIsQ0FBVCxNQUEyQyxDQUFDLENBQW5ELEVBQXNEO0FBQ3BELFdBQUtDLElBQUwsQ0FBVSxxQ0FBYUMsS0FBYixDQUFtQixDQUFuQixFQUFzQixFQUFFTCxLQUF4QixDQUFWOztBQUNBLDJDQUFlLHFDQUFhTSxNQUFiLEdBQ1gscUNBQWFELEtBQWIsQ0FBbUJMLEtBQW5CLENBRFcsR0FFWCxJQUZKO0FBR0Q7O0FBRUQsV0FBTyxLQUFLSCxJQUFJLEVBQWhCO0FBQ0Q7O0FBRURVLEVBQUFBLE1BQU0sQ0FBQ1YsSUFBRCxFQUFPO0FBRVgsUUFBSSx3Q0FBZ0IscUNBQWFTLE1BQWpDLEVBQXlDO0FBQ3ZDLGFBQU8sS0FBS1QsSUFBSSxDQUFDLElBQUQsd0JBQU8sSUFBUCxXQUFoQjtBQUNEO0FBQ0Y7O0FBM0J1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvcyBmcm9tICdvcydcbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJ3N0cmVhbSdcblxuLyoqXG4gKiBHaXZlbiBhIHJhdyBidWZmZXIsIHNwbGl0IGl0IG9uIG5ld2xpbmUgY2hhcmFjdGVycyBhbmQgdHJlYXQgZWFjaCBzcGxpdCBwYXJ0IGFzIGEgc2luZ2xlIFwiZXZlbnRcIlxuICovXG5jbGFzcyBTcGxpdHRlclRyYW5zZm9ybSBleHRlbmRzIFRyYW5zZm9ybSB7XG4gICNidWZmZXIgPSBudWxsXG5cbiAgX3RyYW5zZm9ybShjaHVuaywgZW5jb2RpbmcsIGRvbmUpIHtcbiAgICB0aGlzLiNidWZmZXIgPSB0aGlzLiNidWZmZXJcbiAgICAgID8gQnVmZmVyLmNvbmNhdChbdGhpcy4jYnVmZmVyLCBjaHVua10pXG4gICAgICA6IGNodW5rXG5cbiAgICBsZXQgaW5kZXhcblxuICAgIC8vIEFzIGxvbmcgYXMgd2Uga2VlcCBmaW5kaW5nIG5ld2xpbmVzLCBrZWVwIG1ha2luZyBzbGljZXMgb2YgdGhlIGJ1ZmZlciBhbmQgcHVzaCB0aGVtIHRvIHRoZVxuICAgIC8vIHJlYWRhYmxlIHNpZGUgb2YgdGhlIHRyYW5zZm9ybSBzdHJlYW1cbiAgICB3aGlsZSAoKGluZGV4ID0gdGhpcy4jYnVmZmVyLmluZGV4T2Yob3MuRU9MKSkgIT09IC0xKSB7XG4gICAgICB0aGlzLnB1c2godGhpcy4jYnVmZmVyLnNsaWNlKDAsICsraW5kZXgpKVxuICAgICAgdGhpcy4jYnVmZmVyID0gdGhpcy4jYnVmZmVyLmxlbmd0aFxuICAgICAgICA/IHRoaXMuI2J1ZmZlci5zbGljZShpbmRleClcbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIHZvaWQgZG9uZSgpXG4gIH1cblxuICBfZmx1c2goZG9uZSkge1xuICAgIC8vIElmIHdlIGhhdmUgYW55IHJlbWFpbmluZyBkYXRhIGluIHRoZSBjYWNoZSwgc2VuZCBpdCBvdXRcbiAgICBpZiAodGhpcy4jYnVmZmVyICYmIHRoaXMuI2J1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB2b2lkIGRvbmUobnVsbCwgdGhpcy4jYnVmZmVyKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1xuICBTcGxpdHRlclRyYW5zZm9ybSxcbn1cbiJdfQ==