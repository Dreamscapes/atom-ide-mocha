"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Linter = void 0;

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _atom = require("atom");

var _stackUtils = _interopRequireDefault(require("stack-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

const stackutils = new _stackUtils.default({
  internals: _stackUtils.default.nodeInternals()
});

class Linter extends _atom.Disposable {
  constructor({
    mklinter,
    root: _root2
  }) {
    super();

    _subscriptions.set(this, {
      writable: true,
      value: new _atom.CompositeDisposable()
    });

    _linter.set(this, {
      writable: true,
      value: null
    });

    _root.set(this, {
      writable: true,
      value: null
    });

    _messages.set(this, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldSet(this, _root, _root2);

    _classPrivateFieldSet(this, _linter, mklinter({
      name: 'IDE-Mocha'
    }));

    _classPrivateFieldGet(this, _subscriptions).add(_classPrivateFieldGet(this, _linter));
  }

  didFailTest({
    test,
    err
  }) {
    const callsite = mkcallsite(err);

    if (!callsite) {
      return;
    }

    callsite.file = _path.default.resolve(_classPrivateFieldGet(this, _root), callsite.file);
    callsite.line--;
    const {
      file,
      line,
      column
    } = callsite;
    const message = {
      location: {
        file,
        position: [[line, column], [line, column]]
      },
      severity: 'error',
      excerpt: err.message,
      description: `${test.fullTitle}\n\n${err.stack}`
    };
    const messages = _classPrivateFieldGet(this, _messages).get(file) || [];
    messages.push(message);

    _classPrivateFieldGet(this, _messages).set(file, messages);

    _classPrivateFieldGet(this, _linter).setMessages(file, messages);
  }

  didStartRunning() {
    _classPrivateFieldSet(this, _messages, new Map());

    _classPrivateFieldGet(this, _linter).clearMessages();
  }

  didFinishRunning() {
    _classPrivateFieldSet(this, _messages, new Map());
  }

  dispose() {
    this.linter.clearMessages();

    _classPrivateFieldGet(this, _subscriptions).dispose();

    _classPrivateFieldSet(this, _messages, null);

    _classPrivateFieldSet(this, _linter, null);

    return super.dispose();
  }

}

exports.Linter = Linter;

var _subscriptions = new WeakMap();

var _linter = new WeakMap();

var _root = new WeakMap();

var _messages = new WeakMap();

function mkcallsite(err) {
  const line = stackutils.clean(err.stack).trim().split(_os.default.EOL).shift();
  return stackutils.parseLine(line);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbnRlci5tanMiXSwibmFtZXMiOlsic3RhY2t1dGlscyIsIlN0YWNrVXRpbHMiLCJpbnRlcm5hbHMiLCJub2RlSW50ZXJuYWxzIiwiTGludGVyIiwiRGlzcG9zYWJsZSIsImNvbnN0cnVjdG9yIiwibWtsaW50ZXIiLCJyb290IiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsIk1hcCIsIm5hbWUiLCJhZGQiLCJkaWRGYWlsVGVzdCIsInRlc3QiLCJlcnIiLCJjYWxsc2l0ZSIsIm1rY2FsbHNpdGUiLCJmaWxlIiwicGF0aCIsInJlc29sdmUiLCJsaW5lIiwiY29sdW1uIiwibWVzc2FnZSIsImxvY2F0aW9uIiwicG9zaXRpb24iLCJzZXZlcml0eSIsImV4Y2VycHQiLCJkZXNjcmlwdGlvbiIsImZ1bGxUaXRsZSIsInN0YWNrIiwibWVzc2FnZXMiLCJnZXQiLCJwdXNoIiwic2V0Iiwic2V0TWVzc2FnZXMiLCJkaWRTdGFydFJ1bm5pbmciLCJjbGVhck1lc3NhZ2VzIiwiZGlkRmluaXNoUnVubmluZyIsImRpc3Bvc2UiLCJsaW50ZXIiLCJjbGVhbiIsInRyaW0iLCJzcGxpdCIsIm9zIiwiRU9MIiwic2hpZnQiLCJwYXJzZUxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsSUFBSUMsbUJBQUosQ0FBZTtBQUNoQ0MsRUFBQUEsU0FBUyxFQUFFRCxvQkFBV0UsYUFBWDtBQURxQixDQUFmLENBQW5COztBQUlBLE1BQU1DLE1BQU4sU0FBcUJDLGdCQUFyQixDQUFnQztBQU05QkMsRUFBQUEsV0FBVyxDQUFDO0FBQUVDLElBQUFBLFFBQUY7QUFBWUMsSUFBQUEsSUFBSSxFQUFKQTtBQUFaLEdBQUQsRUFBcUI7QUFDOUI7O0FBRDhCO0FBQUE7QUFBQSxhQUxmLElBQUlDLHlCQUFKO0FBS2U7O0FBQUE7QUFBQTtBQUFBLGFBSnRCO0FBSXNCOztBQUFBO0FBQUE7QUFBQSxhQUh4QjtBQUd3Qjs7QUFBQTtBQUFBO0FBQUEsYUFGcEIsSUFBSUMsR0FBSjtBQUVvQjs7QUFHOUIsdUNBQWFGLE1BQWI7O0FBQ0EseUNBQWVELFFBQVEsQ0FBQztBQUN0QkksTUFBQUEsSUFBSSxFQUFFO0FBRGdCLEtBQUQsQ0FBdkI7O0FBR0EsZ0RBQW9CQyxHQUFwQix1QkFBd0IsSUFBeEI7QUFDRDs7QUFFREMsRUFBQUEsV0FBVyxDQUFDO0FBQUVDLElBQUFBLElBQUY7QUFBUUMsSUFBQUE7QUFBUixHQUFELEVBQWdCO0FBQ3pCLFVBQU1DLFFBQVEsR0FBR0MsVUFBVSxDQUFDRixHQUFELENBQTNCOztBQUdBLFFBQUksQ0FBQ0MsUUFBTCxFQUFlO0FBQ2I7QUFDRDs7QUFFREEsSUFBQUEsUUFBUSxDQUFDRSxJQUFULEdBQWdCQyxjQUFLQyxPQUFMLHVCQUFhLElBQWIsVUFBeUJKLFFBQVEsQ0FBQ0UsSUFBbEMsQ0FBaEI7QUFDQUYsSUFBQUEsUUFBUSxDQUFDSyxJQUFUO0FBRUEsVUFBTTtBQUFFSCxNQUFBQSxJQUFGO0FBQVFHLE1BQUFBLElBQVI7QUFBY0MsTUFBQUE7QUFBZCxRQUF5Qk4sUUFBL0I7QUFDQSxVQUFNTyxPQUFPLEdBQUc7QUFDZEMsTUFBQUEsUUFBUSxFQUFFO0FBQ1JOLFFBQUFBLElBRFE7QUFFUk8sUUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQ0osSUFBRCxFQUFPQyxNQUFQLENBQUQsRUFBaUIsQ0FBQ0QsSUFBRCxFQUFPQyxNQUFQLENBQWpCO0FBRkYsT0FESTtBQUtkSSxNQUFBQSxRQUFRLEVBQUUsT0FMSTtBQU1kQyxNQUFBQSxPQUFPLEVBQUVaLEdBQUcsQ0FBQ1EsT0FOQztBQU9kSyxNQUFBQSxXQUFXLEVBQUcsR0FBRWQsSUFBSSxDQUFDZSxTQUFVLE9BQU1kLEdBQUcsQ0FBQ2UsS0FBTTtBQVBqQyxLQUFoQjtBQVNBLFVBQU1DLFFBQVEsR0FBRyx1Q0FBZUMsR0FBZixDQUFtQmQsSUFBbkIsS0FBNEIsRUFBN0M7QUFFQWEsSUFBQUEsUUFBUSxDQUFDRSxJQUFULENBQWNWLE9BQWQ7O0FBQ0EsMkNBQWVXLEdBQWYsQ0FBbUJoQixJQUFuQixFQUF5QmEsUUFBekI7O0FBQ0EseUNBQWFJLFdBQWIsQ0FBeUJqQixJQUF6QixFQUErQmEsUUFBL0I7QUFDRDs7QUFFREssRUFBQUEsZUFBZSxHQUFHO0FBQ2hCLDJDQUFpQixJQUFJMUIsR0FBSixFQUFqQjs7QUFDQSx5Q0FBYTJCLGFBQWI7QUFDRDs7QUFFREMsRUFBQUEsZ0JBQWdCLEdBQUc7QUFDakIsMkNBQWlCLElBQUk1QixHQUFKLEVBQWpCO0FBQ0Q7O0FBRUQ2QixFQUFBQSxPQUFPLEdBQUc7QUFDUixTQUFLQyxNQUFMLENBQVlILGFBQVo7O0FBQ0EsZ0RBQW9CRSxPQUFwQjs7QUFDQSwyQ0FBaUIsSUFBakI7O0FBQ0EseUNBQWUsSUFBZjs7QUFFQSxXQUFPLE1BQU1BLE9BQU4sRUFBUDtBQUNEOztBQTVENkI7Ozs7Ozs7Ozs7OztBQStEaEMsU0FBU3RCLFVBQVQsQ0FBb0JGLEdBQXBCLEVBQXlCO0FBQ3ZCLFFBQU1NLElBQUksR0FBR3JCLFVBQVUsQ0FDcEJ5QyxLQURVLENBQ0oxQixHQUFHLENBQUNlLEtBREEsRUFFVlksSUFGVSxHQUdWQyxLQUhVLENBR0pDLFlBQUdDLEdBSEMsRUFJVkMsS0FKVSxFQUFiO0FBTUEsU0FBTzlDLFVBQVUsQ0FBQytDLFNBQVgsQ0FBcUIxQixJQUFyQixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb3MgZnJvbSAnb3MnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgU3RhY2tVdGlscyBmcm9tICdzdGFjay11dGlscydcblxuY29uc3Qgc3RhY2t1dGlscyA9IG5ldyBTdGFja1V0aWxzKHtcbiAgaW50ZXJuYWxzOiBTdGFja1V0aWxzLm5vZGVJbnRlcm5hbHMoKSxcbn0pXG5cbmNsYXNzIExpbnRlciBleHRlbmRzIERpc3Bvc2FibGUge1xuICAjc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgI2xpbnRlciA9IG51bGxcbiAgI3Jvb3QgPSBudWxsXG4gICNtZXNzYWdlcyA9IG5ldyBNYXAoKVxuXG4gIGNvbnN0cnVjdG9yKHsgbWtsaW50ZXIsIHJvb3QgfSkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuI3Jvb3QgPSByb290XG4gICAgdGhpcy4jbGludGVyID0gbWtsaW50ZXIoe1xuICAgICAgbmFtZTogJ0lERS1Nb2NoYScsXG4gICAgfSlcbiAgICB0aGlzLiNzdWJzY3JpcHRpb25zLmFkZCh0aGlzLiNsaW50ZXIpXG4gIH1cblxuICBkaWRGYWlsVGVzdCh7IHRlc3QsIGVyciB9KSB7XG4gICAgY29uc3QgY2FsbHNpdGUgPSBta2NhbGxzaXRlKGVycilcblxuICAgIC8vIElmIHdlIGhhdmUgbm8gdmlhYmxlIGVycm9yIGxvY2F0aW9uIGRvIG5vdCBzaG93IHRoZSBlcnJvciBpbiBkaWFnbm9zdGljcyDwn6S34oCN4pmC77iPXG4gICAgaWYgKCFjYWxsc2l0ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2FsbHNpdGUuZmlsZSA9IHBhdGgucmVzb2x2ZSh0aGlzLiNyb290LCBjYWxsc2l0ZS5maWxlKVxuICAgIGNhbGxzaXRlLmxpbmUtLVxuXG4gICAgY29uc3QgeyBmaWxlLCBsaW5lLCBjb2x1bW4gfSA9IGNhbGxzaXRlXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIHBvc2l0aW9uOiBbW2xpbmUsIGNvbHVtbl0sIFtsaW5lLCBjb2x1bW5dXSxcbiAgICAgIH0sXG4gICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgIGV4Y2VycHQ6IGVyci5tZXNzYWdlLFxuICAgICAgZGVzY3JpcHRpb246IGAke3Rlc3QuZnVsbFRpdGxlfVxcblxcbiR7ZXJyLnN0YWNrfWAsXG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy4jbWVzc2FnZXMuZ2V0KGZpbGUpIHx8IFtdXG5cbiAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG4gICAgdGhpcy4jbWVzc2FnZXMuc2V0KGZpbGUsIG1lc3NhZ2VzKVxuICAgIHRoaXMuI2xpbnRlci5zZXRNZXNzYWdlcyhmaWxlLCBtZXNzYWdlcylcbiAgfVxuXG4gIGRpZFN0YXJ0UnVubmluZygpIHtcbiAgICB0aGlzLiNtZXNzYWdlcyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuI2xpbnRlci5jbGVhck1lc3NhZ2VzKClcbiAgfVxuXG4gIGRpZEZpbmlzaFJ1bm5pbmcoKSB7XG4gICAgdGhpcy4jbWVzc2FnZXMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5saW50ZXIuY2xlYXJNZXNzYWdlcygpXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICB0aGlzLiNtZXNzYWdlcyA9IG51bGxcbiAgICB0aGlzLiNsaW50ZXIgPSBudWxsXG5cbiAgICByZXR1cm4gc3VwZXIuZGlzcG9zZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gbWtjYWxsc2l0ZShlcnIpIHtcbiAgY29uc3QgbGluZSA9IHN0YWNrdXRpbHNcbiAgICAuY2xlYW4oZXJyLnN0YWNrKVxuICAgIC50cmltKClcbiAgICAuc3BsaXQob3MuRU9MKVxuICAgIC5zaGlmdCgpXG5cbiAgcmV0dXJuIHN0YWNrdXRpbHMucGFyc2VMaW5lKGxpbmUpXG59XG5cbmV4cG9ydCB7XG4gIExpbnRlcixcbn1cbiJdfQ==
