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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbnRlci5tanMiXSwibmFtZXMiOlsic3RhY2t1dGlscyIsIlN0YWNrVXRpbHMiLCJpbnRlcm5hbHMiLCJub2RlSW50ZXJuYWxzIiwiTGludGVyIiwiRGlzcG9zYWJsZSIsImNvbnN0cnVjdG9yIiwibWtsaW50ZXIiLCJyb290IiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsIk1hcCIsIm5hbWUiLCJhZGQiLCJkaWRGYWlsVGVzdCIsInRlc3QiLCJlcnIiLCJjYWxsc2l0ZSIsIm1rY2FsbHNpdGUiLCJmaWxlIiwicGF0aCIsInJlc29sdmUiLCJsaW5lIiwiY29sdW1uIiwibWVzc2FnZSIsImxvY2F0aW9uIiwicG9zaXRpb24iLCJzZXZlcml0eSIsImV4Y2VycHQiLCJkZXNjcmlwdGlvbiIsImZ1bGxUaXRsZSIsInN0YWNrIiwibWVzc2FnZXMiLCJnZXQiLCJwdXNoIiwic2V0Iiwic2V0TWVzc2FnZXMiLCJkaWRTdGFydFJ1bm5pbmciLCJjbGVhck1lc3NhZ2VzIiwiZGlkRmluaXNoUnVubmluZyIsImRpc3Bvc2UiLCJsaW50ZXIiLCJjbGVhbiIsInRyaW0iLCJzcGxpdCIsIm9zIiwiRU9MIiwic2hpZnQiLCJwYXJzZUxpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsSUFBSUMsbUJBQUosQ0FBZTtBQUNoQ0MsRUFBQUEsU0FBUyxFQUFFRCxvQkFBV0UsYUFBWDtBQURxQixDQUFmLENBQW5COztBQUlBLE1BQU1DLE1BQU4sU0FBcUJDLGdCQUFyQixDQUFnQztBQU05QkMsRUFBQUEsV0FBVyxDQUFDO0FBQUVDLElBQUFBLFFBQUY7QUFBWUMsSUFBQUEsSUFBSSxFQUFKQTtBQUFaLEdBQUQsRUFBcUI7QUFDOUI7O0FBRDhCO0FBQUE7QUFBQSxhQUxmLElBQUlDLHlCQUFKO0FBS2U7O0FBQUE7QUFBQTtBQUFBLGFBSnRCO0FBSXNCOztBQUFBO0FBQUE7QUFBQSxhQUh4QjtBQUd3Qjs7QUFBQTtBQUFBO0FBQUEsYUFGcEIsSUFBSUMsR0FBSjtBQUVvQjs7QUFHOUIsdUNBQWFGLE1BQWI7O0FBQ0EseUNBQWVELFFBQVEsQ0FBQztBQUN0QkksTUFBQUEsSUFBSSxFQUFFO0FBRGdCLEtBQUQsQ0FBdkI7O0FBR0EsZ0RBQW9CQyxHQUFwQix1QkFBd0IsSUFBeEI7QUFDRDs7QUFFREMsRUFBQUEsV0FBVyxDQUFDO0FBQUVDLElBQUFBLElBQUY7QUFBUUMsSUFBQUE7QUFBUixHQUFELEVBQWdCO0FBQ3pCLFVBQU1DLFFBQVEsR0FBR0MsVUFBVSxDQUFDRixHQUFELENBQTNCO0FBQ0FDLElBQUFBLFFBQVEsQ0FBQ0UsSUFBVCxHQUFnQkMsY0FBS0MsT0FBTCx1QkFBYSxJQUFiLFVBQXlCSixRQUFRLENBQUNFLElBQWxDLENBQWhCO0FBQ0FGLElBQUFBLFFBQVEsQ0FBQ0ssSUFBVDtBQUVBLFVBQU07QUFBRUgsTUFBQUEsSUFBRjtBQUFRRyxNQUFBQSxJQUFSO0FBQWNDLE1BQUFBO0FBQWQsUUFBeUJOLFFBQS9CO0FBQ0EsVUFBTU8sT0FBTyxHQUFHO0FBQ2RDLE1BQUFBLFFBQVEsRUFBRTtBQUNSTixRQUFBQSxJQURRO0FBRVJPLFFBQUFBLFFBQVEsRUFBRSxDQUFDLENBQUNKLElBQUQsRUFBT0MsTUFBUCxDQUFELEVBQWlCLENBQUNELElBQUQsRUFBT0MsTUFBUCxDQUFqQjtBQUZGLE9BREk7QUFLZEksTUFBQUEsUUFBUSxFQUFFLE9BTEk7QUFNZEMsTUFBQUEsT0FBTyxFQUFFWixHQUFHLENBQUNRLE9BTkM7QUFPZEssTUFBQUEsV0FBVyxFQUFHLEdBQUVkLElBQUksQ0FBQ2UsU0FBVSxPQUFNZCxHQUFHLENBQUNlLEtBQU07QUFQakMsS0FBaEI7QUFTQSxVQUFNQyxRQUFRLEdBQUcsdUNBQWVDLEdBQWYsQ0FBbUJkLElBQW5CLEtBQTRCLEVBQTdDO0FBRUFhLElBQUFBLFFBQVEsQ0FBQ0UsSUFBVCxDQUFjVixPQUFkOztBQUNBLDJDQUFlVyxHQUFmLENBQW1CaEIsSUFBbkIsRUFBeUJhLFFBQXpCOztBQUNBLHlDQUFhSSxXQUFiLENBQXlCakIsSUFBekIsRUFBK0JhLFFBQS9CO0FBQ0Q7O0FBRURLLEVBQUFBLGVBQWUsR0FBRztBQUNoQiwyQ0FBaUIsSUFBSTFCLEdBQUosRUFBakI7O0FBQ0EseUNBQWEyQixhQUFiO0FBQ0Q7O0FBRURDLEVBQUFBLGdCQUFnQixHQUFHO0FBQ2pCLDJDQUFpQixJQUFJNUIsR0FBSixFQUFqQjtBQUNEOztBQUVENkIsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsU0FBS0MsTUFBTCxDQUFZSCxhQUFaOztBQUNBLGdEQUFvQkUsT0FBcEI7O0FBQ0EsMkNBQWlCLElBQWpCOztBQUNBLHlDQUFlLElBQWY7O0FBRUEsV0FBTyxNQUFNQSxPQUFOLEVBQVA7QUFDRDs7QUF0RDZCOzs7Ozs7Ozs7Ozs7QUF5RGhDLFNBQVN0QixVQUFULENBQW9CRixHQUFwQixFQUF5QjtBQUN2QixRQUFNTSxJQUFJLEdBQUdyQixVQUFVLENBQ3BCeUMsS0FEVSxDQUNKMUIsR0FBRyxDQUFDZSxLQURBLEVBRVZZLElBRlUsR0FHVkMsS0FIVSxDQUdKQyxZQUFHQyxHQUhDLEVBSVZDLEtBSlUsRUFBYjtBQU1BLFNBQU85QyxVQUFVLENBQUMrQyxTQUFYLENBQXFCMUIsSUFBckIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9zIGZyb20gJ29zJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IFN0YWNrVXRpbHMgZnJvbSAnc3RhY2stdXRpbHMnXG5cbmNvbnN0IHN0YWNrdXRpbHMgPSBuZXcgU3RhY2tVdGlscyh7XG4gIGludGVybmFsczogU3RhY2tVdGlscy5ub2RlSW50ZXJuYWxzKCksXG59KVxuXG5jbGFzcyBMaW50ZXIgZXh0ZW5kcyBEaXNwb3NhYmxlIHtcbiAgI3N1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICNsaW50ZXIgPSBudWxsXG4gICNyb290ID0gbnVsbFxuICAjbWVzc2FnZXMgPSBuZXcgTWFwKClcblxuICBjb25zdHJ1Y3Rvcih7IG1rbGludGVyLCByb290IH0pIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLiNyb290ID0gcm9vdFxuICAgIHRoaXMuI2xpbnRlciA9IG1rbGludGVyKHtcbiAgICAgIG5hbWU6ICdJREUtTW9jaGEnLFxuICAgIH0pXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9ucy5hZGQodGhpcy4jbGludGVyKVxuICB9XG5cbiAgZGlkRmFpbFRlc3QoeyB0ZXN0LCBlcnIgfSkge1xuICAgIGNvbnN0IGNhbGxzaXRlID0gbWtjYWxsc2l0ZShlcnIpXG4gICAgY2FsbHNpdGUuZmlsZSA9IHBhdGgucmVzb2x2ZSh0aGlzLiNyb290LCBjYWxsc2l0ZS5maWxlKVxuICAgIGNhbGxzaXRlLmxpbmUtLVxuXG4gICAgY29uc3QgeyBmaWxlLCBsaW5lLCBjb2x1bW4gfSA9IGNhbGxzaXRlXG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIHBvc2l0aW9uOiBbW2xpbmUsIGNvbHVtbl0sIFtsaW5lLCBjb2x1bW5dXSxcbiAgICAgIH0sXG4gICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgIGV4Y2VycHQ6IGVyci5tZXNzYWdlLFxuICAgICAgZGVzY3JpcHRpb246IGAke3Rlc3QuZnVsbFRpdGxlfVxcblxcbiR7ZXJyLnN0YWNrfWAsXG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy4jbWVzc2FnZXMuZ2V0KGZpbGUpIHx8IFtdXG5cbiAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG4gICAgdGhpcy4jbWVzc2FnZXMuc2V0KGZpbGUsIG1lc3NhZ2VzKVxuICAgIHRoaXMuI2xpbnRlci5zZXRNZXNzYWdlcyhmaWxlLCBtZXNzYWdlcylcbiAgfVxuXG4gIGRpZFN0YXJ0UnVubmluZygpIHtcbiAgICB0aGlzLiNtZXNzYWdlcyA9IG5ldyBNYXAoKVxuICAgIHRoaXMuI2xpbnRlci5jbGVhck1lc3NhZ2VzKClcbiAgfVxuXG4gIGRpZEZpbmlzaFJ1bm5pbmcoKSB7XG4gICAgdGhpcy4jbWVzc2FnZXMgPSBuZXcgTWFwKClcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5saW50ZXIuY2xlYXJNZXNzYWdlcygpXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICB0aGlzLiNtZXNzYWdlcyA9IG51bGxcbiAgICB0aGlzLiNsaW50ZXIgPSBudWxsXG5cbiAgICByZXR1cm4gc3VwZXIuZGlzcG9zZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gbWtjYWxsc2l0ZShlcnIpIHtcbiAgY29uc3QgbGluZSA9IHN0YWNrdXRpbHNcbiAgICAuY2xlYW4oZXJyLnN0YWNrKVxuICAgIC50cmltKClcbiAgICAuc3BsaXQob3MuRU9MKVxuICAgIC5zaGlmdCgpXG5cbiAgcmV0dXJuIHN0YWNrdXRpbHMucGFyc2VMaW5lKGxpbmUpXG59XG5cbmV4cG9ydCB7XG4gIExpbnRlcixcbn1cbiJdfQ==