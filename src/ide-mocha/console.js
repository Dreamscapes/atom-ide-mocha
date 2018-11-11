"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Console = void 0;

var _atom = require("atom");

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

const CONSOLE_VIEW_URI = 'atom://nuclide/console';

class Console extends _atom.Disposable {
  constructor({
    mkconsole
  }) {
    super();

    _subscriptions.set(this, {
      writable: true,
      value: new _atom.CompositeDisposable()
    });

    _console.set(this, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _console, mkconsole({
      id: 'IDE-Mocha',
      name: 'IDE-Mocha'
    }));
  }

  didFinishRunning({
    stats
  }) {
    _classPrivateFieldGet(this, _console).log(stats);
  }

  didStartSuite({
    suite
  }) {
    _classPrivateFieldGet(this, _console).log(suite.titlePath.join(' ▶︎ '));
  }

  didPassTest({
    test
  }) {
    _classPrivateFieldGet(this, _console).success(test.title);
  }

  didFailTest({
    test,
    err
  }) {
    _classPrivateFieldGet(this, _console).error(test.title);

    _classPrivateFieldGet(this, _console).error(err.stack);
  }

  didSkipTest({
    test
  }) {
    _classPrivateFieldGet(this, _console).warn(test.title);
  }

  printAddressInfo({
    address,
    type
  }) {
    this.focus();

    _classPrivateFieldGet(this, _console).log(`Listening on ${type}: ${address}`);
  }

  focus() {
    atom.workspace.open(CONSOLE_VIEW_URI);
  }

  dispose() {
    _classPrivateFieldGet(this, _subscriptions).dispose();

    _classPrivateFieldSet(this, _console, null);

    return super.dispose();
  }

}

exports.Console = Console;

var _subscriptions = new WeakMap();

var _console = new WeakMap();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnNvbGUubWpzIl0sIm5hbWVzIjpbIkNPTlNPTEVfVklFV19VUkkiLCJDb25zb2xlIiwiRGlzcG9zYWJsZSIsImNvbnN0cnVjdG9yIiwibWtjb25zb2xlIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImlkIiwibmFtZSIsImRpZEZpbmlzaFJ1bm5pbmciLCJzdGF0cyIsImxvZyIsImRpZFN0YXJ0U3VpdGUiLCJzdWl0ZSIsInRpdGxlUGF0aCIsImpvaW4iLCJkaWRQYXNzVGVzdCIsInRlc3QiLCJzdWNjZXNzIiwidGl0bGUiLCJkaWRGYWlsVGVzdCIsImVyciIsImVycm9yIiwic3RhY2siLCJkaWRTa2lwVGVzdCIsIndhcm4iLCJwcmludEFkZHJlc3NJbmZvIiwiYWRkcmVzcyIsInR5cGUiLCJmb2N1cyIsImF0b20iLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiZGlzcG9zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxnQkFBZ0IsR0FBRyx3QkFBekI7O0FBRUEsTUFBTUMsT0FBTixTQUFzQkMsZ0JBQXRCLENBQWlDO0FBSS9CQyxFQUFBQSxXQUFXLENBQUM7QUFBRUMsSUFBQUE7QUFBRixHQUFELEVBQWdCO0FBQ3pCOztBQUR5QjtBQUFBO0FBQUEsYUFIVixJQUFJQyx5QkFBSjtBQUdVOztBQUFBO0FBQUE7QUFBQSxhQUZoQjtBQUVnQjs7QUFHekIsMENBQWdCRCxTQUFTLENBQUM7QUFDeEJFLE1BQUFBLEVBQUUsRUFBRSxXQURvQjtBQUV4QkMsTUFBQUEsSUFBSSxFQUFFO0FBRmtCLEtBQUQsQ0FBekI7QUFJRDs7QUFFREMsRUFBQUEsZ0JBQWdCLENBQUM7QUFBRUMsSUFBQUE7QUFBRixHQUFELEVBQVk7QUFDMUIsMENBQWNDLEdBQWQsQ0FBa0JELEtBQWxCO0FBQ0Q7O0FBRURFLEVBQUFBLGFBQWEsQ0FBQztBQUFFQyxJQUFBQTtBQUFGLEdBQUQsRUFBWTtBQUN2QiwwQ0FBY0YsR0FBZCxDQUFrQkUsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxJQUFoQixDQUFxQixNQUFyQixDQUFsQjtBQUNEOztBQUVEQyxFQUFBQSxXQUFXLENBQUM7QUFBRUMsSUFBQUE7QUFBRixHQUFELEVBQVc7QUFDcEIsMENBQWNDLE9BQWQsQ0FBc0JELElBQUksQ0FBQ0UsS0FBM0I7QUFDRDs7QUFFREMsRUFBQUEsV0FBVyxDQUFDO0FBQUVILElBQUFBLElBQUY7QUFBUUksSUFBQUE7QUFBUixHQUFELEVBQWdCO0FBQ3pCLDBDQUFjQyxLQUFkLENBQW9CTCxJQUFJLENBQUNFLEtBQXpCOztBQUNBLDBDQUFjRyxLQUFkLENBQW9CRCxHQUFHLENBQUNFLEtBQXhCO0FBQ0Q7O0FBRURDLEVBQUFBLFdBQVcsQ0FBQztBQUFFUCxJQUFBQTtBQUFGLEdBQUQsRUFBVztBQUNwQiwwQ0FBY1EsSUFBZCxDQUFtQlIsSUFBSSxDQUFDRSxLQUF4QjtBQUNEOztBQUVETyxFQUFBQSxnQkFBZ0IsQ0FBQztBQUFFQyxJQUFBQSxPQUFGO0FBQVdDLElBQUFBO0FBQVgsR0FBRCxFQUFvQjtBQUNsQyxTQUFLQyxLQUFMOztBQUNBLDBDQUFjbEIsR0FBZCxDQUFtQixnQkFBZWlCLElBQUssS0FBSUQsT0FBUSxFQUFuRDtBQUNEOztBQUVERSxFQUFBQSxLQUFLLEdBQUc7QUFDTkMsSUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVDLElBQWYsQ0FBb0IvQixnQkFBcEI7QUFDRDs7QUFFRGdDLEVBQUFBLE9BQU8sR0FBRztBQUNSLGdEQUFvQkEsT0FBcEI7O0FBQ0EsMENBQWdCLElBQWhCOztBQUVBLFdBQU8sTUFBTUEsT0FBTixFQUFQO0FBQ0Q7O0FBaEQ4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuXG5jb25zdCBDT05TT0xFX1ZJRVdfVVJJID0gJ2F0b206Ly9udWNsaWRlL2NvbnNvbGUnXG5cbmNsYXNzIENvbnNvbGUgZXh0ZW5kcyBEaXNwb3NhYmxlIHtcbiAgI3N1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICNjb25zb2xlID0gbnVsbFxuXG4gIGNvbnN0cnVjdG9yKHsgbWtjb25zb2xlIH0pIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLiNjb25zb2xlID0gbWtjb25zb2xlKHtcbiAgICAgIGlkOiAnSURFLU1vY2hhJyxcbiAgICAgIG5hbWU6ICdJREUtTW9jaGEnLFxuICAgIH0pXG4gIH1cblxuICBkaWRGaW5pc2hSdW5uaW5nKHsgc3RhdHMgfSkge1xuICAgIHRoaXMuI2NvbnNvbGUubG9nKHN0YXRzKVxuICB9XG5cbiAgZGlkU3RhcnRTdWl0ZSh7IHN1aXRlIH0pIHtcbiAgICB0aGlzLiNjb25zb2xlLmxvZyhzdWl0ZS50aXRsZVBhdGguam9pbignIOKWtu+4jiAnKSlcbiAgfVxuXG4gIGRpZFBhc3NUZXN0KHsgdGVzdCB9KSB7XG4gICAgdGhpcy4jY29uc29sZS5zdWNjZXNzKHRlc3QudGl0bGUpXG4gIH1cblxuICBkaWRGYWlsVGVzdCh7IHRlc3QsIGVyciB9KSB7XG4gICAgdGhpcy4jY29uc29sZS5lcnJvcih0ZXN0LnRpdGxlKVxuICAgIHRoaXMuI2NvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxuICB9XG5cbiAgZGlkU2tpcFRlc3QoeyB0ZXN0IH0pIHtcbiAgICB0aGlzLiNjb25zb2xlLndhcm4odGVzdC50aXRsZSlcbiAgfVxuXG4gIHByaW50QWRkcmVzc0luZm8oeyBhZGRyZXNzLCB0eXBlIH0pIHtcbiAgICB0aGlzLmZvY3VzKClcbiAgICB0aGlzLiNjb25zb2xlLmxvZyhgTGlzdGVuaW5nIG9uICR7dHlwZX06ICR7YWRkcmVzc31gKVxuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihDT05TT0xFX1ZJRVdfVVJJKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICB0aGlzLiNzdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICAgIHRoaXMuI2NvbnNvbGUgPSBudWxsXG5cbiAgICByZXR1cm4gc3VwZXIuZGlzcG9zZSgpXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgQ29uc29sZSxcbn1cbiJdfQ==