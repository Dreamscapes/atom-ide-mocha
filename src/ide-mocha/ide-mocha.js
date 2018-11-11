"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdeMocha = void 0;

var _atom = require("atom");

var _events = require("events");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _package = _interopRequireDefault(require("../../package"));

var _remote2 = require("../remote");

var util = _interopRequireDefault(require("./util"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

const HELP_TEMPLATE = _fs.default.readFileSync(_path.default.resolve(__dirname, 'static', 'help.md'), 'utf8');

class IdeMocha {
  constructor() {
    _root.set(this, {
      writable: true,
      value: null
    });

    _subscriptions.set(this, {
      writable: true,
      value: null
    });

    _settings.set(this, {
      writable: true,
      value: null
    });

    _reporter.set(this, {
      writable: true,
      value: null
    });

    _remote.set(this, {
      writable: true,
      value: null
    });

    _defineProperty(this, "config", _.config);

    _defineProperty(this, "commands", {
      [`${_package.default.name}:print-address-info`]: this.printAddressInfo.bind(this),
      [`${_package.default.name}:copy-receiver-address`]: this.copyReceiverAddress.bind(this),
      [`${_package.default.name}:copy-mocha-command`]: this.copyMochaCommand.bind(this),
      [`${_package.default.name}:show-help`]: this.showHelp.bind(this)
    });

    _defineProperty(this, "busy", null);

    _defineProperty(this, "console", null);

    _defineProperty(this, "linter", null);

    _defineProperty(this, "spinner", null);

    _defineProperty(this, "stats", {
      total: 0,
      completed: 0
    });
  }

  activate() {
    _classPrivateFieldSet(this, _root, atom.project.getPaths().shift());

    _classPrivateFieldSet(this, _subscriptions, new _atom.CompositeDisposable());

    _classPrivateFieldSet(this, _reporter, new _events.EventEmitter());

    _classPrivateFieldSet(this, _settings, atom.config.get(_package.default.name));

    _classPrivateFieldGet(this, _settings).address = util.mkaddress({
      root: _classPrivateFieldGet(this, _root),
      type: _classPrivateFieldGet(this, _settings).interface
    });

    _classPrivateFieldSet(this, _remote, (0, _remote2.remote)({
      address: _classPrivateFieldGet(this, _settings).address,
      receiver: _classPrivateFieldGet(this, _reporter)
    }));

    _classPrivateFieldGet(this, _subscriptions).add(atom.commands.add('atom-workspace', this.commands));

    _classPrivateFieldGet(this, _reporter).on('start', runner => this.didStartRunning({
      runner
    }));

    _classPrivateFieldGet(this, _reporter).on('end', runner => this.didFinishRunning({
      runner
    }));

    _classPrivateFieldGet(this, _reporter).on('suite', suite => this.didStartSuite({
      suite
    }));

    _classPrivateFieldGet(this, _reporter).on('test end', () => this.didFinishTest());

    _classPrivateFieldGet(this, _reporter).on('pass', test => this.didPassTest({
      test
    }));

    _classPrivateFieldGet(this, _reporter).on('fail', (test, err) => this.didFailTest({
      test,
      err
    }));

    _classPrivateFieldGet(this, _reporter).on('pending', test => this.didSkipTest({
      test
    }));
  }

  deactivate() {
    this.spinner && this.spinner.dispose();

    _classPrivateFieldGet(this, _subscriptions).dispose();

    _classPrivateFieldSet(this, _settings, null);

    _classPrivateFieldGet(this, _remote).close();

    _classPrivateFieldSet(this, _reporter, null);

    this.busy = null;
    this.console = null;
    this.linter = null;
  }

  consumeBusySignal(busy) {
    this.busy = busy;
  }

  consumeConsole(mkconsole) {
    this.console = new _.Console({
      mkconsole
    });

    _classPrivateFieldGet(this, _subscriptions).add(this.console);
  }

  consumeLinter(mklinter) {
    this.linter = new _.Linter({
      mklinter,
      root: _classPrivateFieldGet(this, _root)
    });

    _classPrivateFieldGet(this, _subscriptions).add(this.linter);
  }

  didStartRunning({
    runner
  }) {
    this.stats.total = runner.total;
    this.stats.completed = 0;
    this.spinner = this.busy.reportBusy('Running Mocha tests: 0%');

    if (_classPrivateFieldGet(this, _settings).openConsoleOnStart) {
      this.console.focus();
    }

    this.linter.didStartRunning();
  }

  didFinishRunning({
    runner
  }) {
    this.spinner = this.spinner.dispose();
    this.stats.total = 0;
    this.stats.completed = 0;
    const stats = util.mkstats({
      runner
    });
    this.linter.didFinishRunning();
    this.console.didFinishRunning({
      stats
    });

    if (!runner.stats.failures && _classPrivateFieldGet(this, _settings).notifyOnSuccess) {
      this.showSuccessNotification({
        stats
      });
    }

    if (runner.stats.failures && _classPrivateFieldGet(this, _settings).notifyOnFailure) {
      this.showFailureNotification({
        stats
      });
    }
  }

  didStartSuite({
    suite
  }) {
    this.console.didStartSuite({
      suite
    });
  }

  didFinishTest() {
    this.stats.completed++;
    const percent = Math.floor(this.stats.completed / this.stats.total * 100);
    this.spinner.setTitle(`Running Mocha tests: ${Math.floor(percent)}%`);
  }

  didPassTest({
    test
  }) {
    this.console.didPassTest({
      test
    });
  }

  didFailTest({
    test,
    err
  }) {
    this.console.didFailTest({
      test,
      err
    });
    this.linter.didFailTest({
      test,
      err
    });
  }

  didSkipTest({
    test
  }) {
    this.console.didSkipTest({
      test
    });
  }

  showSuccessNotification({
    stats
  }) {
    atom.notifications.addSuccess('Test suite passed.', {
      description: '**IDE-Mocha**',
      detail: stats
    });
  }

  showFailureNotification({
    stats
  }) {
    atom.notifications.addError('Test suite failed.', {
      description: '**IDE-Mocha**',
      detail: stats,
      buttons: [{
        text: 'Open Console',
        onDidClick: () => this.console.focus()
      }]
    });
  }

  printAddressInfo() {
    const address = util.mkaddressinfo({
      address: _classPrivateFieldGet(this, _remote).address()
    });

    const type = _classPrivateFieldGet(this, _settings).interface;

    this.console.printAddressInfo({
      address,
      type
    });
  }

  copyReceiverAddress() {
    atom.clipboard.write(_classPrivateFieldGet(this, _settings).address);
    atom.notifications.addInfo('Copied!', {
      description: '**IDE-Mocha**'
    });
  }

  copyMochaCommand() {
    const address = _classPrivateFieldGet(this, _settings).address;

    const command = util.mkcommandinfo({
      address
    });
    atom.clipboard.write(command);
    atom.notifications.addInfo('Copied!', {
      description: '**IDE-Mocha**'
    });
  }

  showHelp() {
    const address = _classPrivateFieldGet(this, _settings).address;

    const command = util.mkcommandinfo({
      address
    });
    const help = HELP_TEMPLATE.replace('#{COMMAND}', command);
    atom.notifications.addInfo('IDE-Mocha: Help', {
      description: help,
      icon: 'mortar-board',
      dismissable: true,
      buttons: [{
        text: ' Copy Mocha command to clipboard',
        className: 'btn btn-info icon-clippy selected',

        onDidClick() {
          atom.clipboard.write(command);
          atom.notifications.addSuccess('Copied!', {
            description: '**IDE-Mocha**'
          });
        }

      }]
    });
  }

}

exports.IdeMocha = IdeMocha;

var _root = new WeakMap();

var _subscriptions = new WeakMap();

var _settings = new WeakMap();

var _reporter = new WeakMap();

var _remote = new WeakMap();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZS1tb2NoYS5tanMiXSwibmFtZXMiOlsiSEVMUF9URU1QTEFURSIsImZzIiwicmVhZEZpbGVTeW5jIiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJJZGVNb2NoYSIsImNvbmZpZyIsInBrZyIsIm5hbWUiLCJwcmludEFkZHJlc3NJbmZvIiwiY29weVJlY2VpdmVyQWRkcmVzcyIsImNvcHlNb2NoYUNvbW1hbmQiLCJzaG93SGVscCIsInRvdGFsIiwiY29tcGxldGVkIiwiYWN0aXZhdGUiLCJhdG9tIiwicHJvamVjdCIsImdldFBhdGhzIiwic2hpZnQiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiRXZlbnRFbWl0dGVyIiwiZ2V0IiwiYWRkcmVzcyIsInV0aWwiLCJta2FkZHJlc3MiLCJyb290IiwidHlwZSIsImludGVyZmFjZSIsInJlY2VpdmVyIiwiYWRkIiwiY29tbWFuZHMiLCJvbiIsInJ1bm5lciIsImRpZFN0YXJ0UnVubmluZyIsImRpZEZpbmlzaFJ1bm5pbmciLCJzdWl0ZSIsImRpZFN0YXJ0U3VpdGUiLCJkaWRGaW5pc2hUZXN0IiwidGVzdCIsImRpZFBhc3NUZXN0IiwiZXJyIiwiZGlkRmFpbFRlc3QiLCJkaWRTa2lwVGVzdCIsImRlYWN0aXZhdGUiLCJzcGlubmVyIiwiZGlzcG9zZSIsImNsb3NlIiwiYnVzeSIsImNvbnNvbGUiLCJsaW50ZXIiLCJjb25zdW1lQnVzeVNpZ25hbCIsImNvbnN1bWVDb25zb2xlIiwibWtjb25zb2xlIiwiQ29uc29sZSIsImNvbnN1bWVMaW50ZXIiLCJta2xpbnRlciIsIkxpbnRlciIsInN0YXRzIiwicmVwb3J0QnVzeSIsIm9wZW5Db25zb2xlT25TdGFydCIsImZvY3VzIiwibWtzdGF0cyIsImZhaWx1cmVzIiwibm90aWZ5T25TdWNjZXNzIiwic2hvd1N1Y2Nlc3NOb3RpZmljYXRpb24iLCJub3RpZnlPbkZhaWx1cmUiLCJzaG93RmFpbHVyZU5vdGlmaWNhdGlvbiIsInBlcmNlbnQiLCJNYXRoIiwiZmxvb3IiLCJzZXRUaXRsZSIsIm5vdGlmaWNhdGlvbnMiLCJhZGRTdWNjZXNzIiwiZGVzY3JpcHRpb24iLCJkZXRhaWwiLCJhZGRFcnJvciIsImJ1dHRvbnMiLCJ0ZXh0Iiwib25EaWRDbGljayIsIm1rYWRkcmVzc2luZm8iLCJjbGlwYm9hcmQiLCJ3cml0ZSIsImFkZEluZm8iLCJjb21tYW5kIiwibWtjb21tYW5kaW5mbyIsImhlbHAiLCJyZXBsYWNlIiwiaWNvbiIsImRpc21pc3NhYmxlIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBR0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxNQUFNQSxhQUFhLEdBQUdDLFlBQUdDLFlBQUgsQ0FBZ0JDLGNBQUtDLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixRQUF4QixFQUFrQyxTQUFsQyxDQUFoQixFQUE4RCxNQUE5RCxDQUF0Qjs7QUFFQSxNQUFNQyxRQUFOLENBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUNMO0FBREs7O0FBQUE7QUFBQTtBQUFBLGFBRUk7QUFGSjs7QUFBQTtBQUFBO0FBQUEsYUFHRDtBQUhDOztBQUFBO0FBQUE7QUFBQSxhQUlEO0FBSkM7O0FBQUE7QUFBQTtBQUFBLGFBS0g7QUFMRzs7QUFBQSxvQ0FPSkMsUUFQSTs7QUFBQSxzQ0FRRjtBQUNULE9BQUUsR0FBRUMsaUJBQUlDLElBQUsscUJBQWIsR0FBc0MsS0FBS0MsZ0JBQTNDLE1BQXNDLElBQXRDLENBRFM7QUFFVCxPQUFFLEdBQUVGLGlCQUFJQyxJQUFLLHdCQUFiLEdBQXlDLEtBQUtFLG1CQUE5QyxNQUF5QyxJQUF6QyxDQUZTO0FBR1QsT0FBRSxHQUFFSCxpQkFBSUMsSUFBSyxxQkFBYixHQUFzQyxLQUFLRyxnQkFBM0MsTUFBc0MsSUFBdEMsQ0FIUztBQUlULE9BQUUsR0FBRUosaUJBQUlDLElBQUssWUFBYixHQUE2QixLQUFLSSxRQUFsQyxNQUE2QixJQUE3QjtBQUpTLEtBUkU7O0FBQUEsa0NBZU4sSUFm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QUFJLENBQUN3RCxhQUFMLENBQW1CQyxVQUFuQixDQUE4QixTQUE5QixFQUF5QztBQUN2Q0MsWUFBQUEsV0FBVyxFQUFFO0FBRDBCLFdBQXpDO0FBR0Q7O0FBVE8sT0FBRDtBQUptQyxLQUE5QztBQWdCRDs7QUE3TFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb3NpdGVEaXNwb3NhYmxlLFxufSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBwa2cgZnJvbSAnLi4vLi4vcGFja2FnZSdcbmltcG9ydCB7IHJlbW90ZSB9IGZyb20gJy4uL3JlbW90ZSdcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgY29uZmlnLCBMaW50ZXIsIENvbnNvbGUgfSBmcm9tICcuJ1xuXG5jb25zdCBIRUxQX1RFTVBMQVRFID0gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzdGF0aWMnLCAnaGVscC5tZCcpLCAndXRmOCcpXG5cbmNsYXNzIElkZU1vY2hhIHtcbiAgI3Jvb3QgPSBudWxsXG4gICNzdWJzY3JpcHRpb25zID0gbnVsbFxuICAjc2V0dGluZ3MgPSBudWxsXG4gICNyZXBvcnRlciA9IG51bGxcbiAgI3JlbW90ZSA9IG51bGxcblxuICBjb25maWcgPSBjb25maWdcbiAgY29tbWFuZHMgPSB7XG4gICAgW2Ake3BrZy5uYW1lfTpwcmludC1hZGRyZXNzLWluZm9gXTogOjp0aGlzLnByaW50QWRkcmVzc0luZm8sXG4gICAgW2Ake3BrZy5uYW1lfTpjb3B5LXJlY2VpdmVyLWFkZHJlc3NgXTogOjp0aGlzLmNvcHlSZWNlaXZlckFkZHJlc3MsXG4gICAgW2Ake3BrZy5uYW1lfTpjb3B5LW1vY2hhLWNvbW1hbmRgXTogOjp0aGlzLmNvcHlNb2NoYUNvbW1hbmQsXG4gICAgW2Ake3BrZy5uYW1lfTpzaG93LWhlbHBgXTogOjp0aGlzLnNob3dIZWxwLFxuICB9XG5cbiAgYnVzeSA9IG51bGxcbiAgY29uc29sZSA9IG51bGxcbiAgbGludGVyID0gbnVsbFxuICBzcGlubmVyID0gbnVsbFxuXG4gIHN0YXRzID0ge1xuICAgIHRvdGFsOiAwLFxuICAgIGNvbXBsZXRlZDogMCxcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuI3Jvb3QgPSBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKS5zaGlmdCgpXG5cbiAgICB0aGlzLiNzdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICAgIHRoaXMuI3JlcG9ydGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG5cbiAgICB0aGlzLiNzZXR0aW5ncyA9IGF0b20uY29uZmlnLmdldChwa2cubmFtZSlcbiAgICB0aGlzLiNzZXR0aW5ncy5hZGRyZXNzID0gdXRpbC5ta2FkZHJlc3MoeyByb290OiB0aGlzLiNyb290LCB0eXBlOiB0aGlzLiNzZXR0aW5ncy5pbnRlcmZhY2UgfSlcbiAgICB0aGlzLiNyZW1vdGUgPSByZW1vdGUoeyBhZGRyZXNzOiB0aGlzLiNzZXR0aW5ncy5hZGRyZXNzLCByZWNlaXZlcjogdGhpcy4jcmVwb3J0ZXIgfSlcblxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHRoaXMuY29tbWFuZHMpKVxuXG4gICAgdGhpcy4jcmVwb3J0ZXIub24oJ3N0YXJ0JywgcnVubmVyID0+IHRoaXMuZGlkU3RhcnRSdW5uaW5nKHsgcnVubmVyIH0pKVxuICAgIHRoaXMuI3JlcG9ydGVyLm9uKCdlbmQnLCBydW5uZXIgPT4gdGhpcy5kaWRGaW5pc2hSdW5uaW5nKHsgcnVubmVyIH0pKVxuICAgIHRoaXMuI3JlcG9ydGVyLm9uKCdzdWl0ZScsIHN1aXRlID0+IHRoaXMuZGlkU3RhcnRTdWl0ZSh7IHN1aXRlIH0pKVxuICAgIHRoaXMuI3JlcG9ydGVyLm9uKCd0ZXN0IGVuZCcsICgpID0+IHRoaXMuZGlkRmluaXNoVGVzdCgpKVxuICAgIHRoaXMuI3JlcG9ydGVyLm9uKCdwYXNzJywgdGVzdCA9PiB0aGlzLmRpZFBhc3NUZXN0KHsgdGVzdCB9KSlcbiAgICB0aGlzLiNyZXBvcnRlci5vbignZmFpbCcsICh0ZXN0LCBlcnIpID0+IHRoaXMuZGlkRmFpbFRlc3QoeyB0ZXN0LCBlcnIgfSkpXG4gICAgdGhpcy4jcmVwb3J0ZXIub24oJ3BlbmRpbmcnLCB0ZXN0ID0+IHRoaXMuZGlkU2tpcFRlc3QoeyB0ZXN0IH0pKVxuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnNwaW5uZXIgJiYgdGhpcy5zcGlubmVyLmRpc3Bvc2UoKVxuICAgIHRoaXMuI3N1YnNjcmlwdGlvbnMuZGlzcG9zZSgpXG4gICAgdGhpcy4jc2V0dGluZ3MgPSBudWxsXG4gICAgdGhpcy4jcmVtb3RlLmNsb3NlKClcbiAgICB0aGlzLiNyZXBvcnRlciA9IG51bGxcbiAgICB0aGlzLmJ1c3kgPSBudWxsXG4gICAgdGhpcy5jb25zb2xlID0gbnVsbFxuICAgIHRoaXMubGludGVyID0gbnVsbFxuICB9XG5cbiAgY29uc3VtZUJ1c3lTaWduYWwoYnVzeSkge1xuICAgIHRoaXMuYnVzeSA9IGJ1c3lcbiAgfVxuXG4gIGNvbnN1bWVDb25zb2xlKG1rY29uc29sZSkge1xuICAgIHRoaXMuY29uc29sZSA9IG5ldyBDb25zb2xlKHsgbWtjb25zb2xlIH0pXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5jb25zb2xlKVxuICB9XG5cbiAgY29uc3VtZUxpbnRlcihta2xpbnRlcikge1xuICAgIHRoaXMubGludGVyID0gbmV3IExpbnRlcih7IG1rbGludGVyLCByb290OiB0aGlzLiNyb290IH0pXG4gICAgdGhpcy4jc3Vic2NyaXB0aW9ucy5hZGQodGhpcy5saW50ZXIpXG4gIH1cblxuICBkaWRTdGFydFJ1bm5pbmcoeyBydW5uZXIgfSkge1xuICAgIHRoaXMuc3RhdHMudG90YWwgPSBydW5uZXIudG90YWxcbiAgICB0aGlzLnN0YXRzLmNvbXBsZXRlZCA9IDBcbiAgICB0aGlzLnNwaW5uZXIgPSB0aGlzLmJ1c3kucmVwb3J0QnVzeSgnUnVubmluZyBNb2NoYSB0ZXN0czogMCUnKVxuXG4gICAgaWYgKHRoaXMuI3NldHRpbmdzLm9wZW5Db25zb2xlT25TdGFydCkge1xuICAgICAgdGhpcy5jb25zb2xlLmZvY3VzKClcbiAgICB9XG5cbiAgICB0aGlzLmxpbnRlci5kaWRTdGFydFJ1bm5pbmcoKVxuICB9XG5cbiAgZGlkRmluaXNoUnVubmluZyh7IHJ1bm5lciB9KSB7XG4gICAgdGhpcy5zcGlubmVyID0gdGhpcy5zcGlubmVyLmRpc3Bvc2UoKVxuICAgIHRoaXMuc3RhdHMudG90YWwgPSAwXG4gICAgdGhpcy5zdGF0cy5jb21wbGV0ZWQgPSAwXG5cbiAgICBjb25zdCBzdGF0cyA9IHV0aWwubWtzdGF0cyh7IHJ1bm5lciB9KVxuXG4gICAgdGhpcy5saW50ZXIuZGlkRmluaXNoUnVubmluZygpXG4gICAgdGhpcy5jb25zb2xlLmRpZEZpbmlzaFJ1bm5pbmcoeyBzdGF0cyB9KVxuXG4gICAgaWYgKCFydW5uZXIuc3RhdHMuZmFpbHVyZXMgJiYgdGhpcy4jc2V0dGluZ3Mubm90aWZ5T25TdWNjZXNzKSB7XG4gICAgICB0aGlzLnNob3dTdWNjZXNzTm90aWZpY2F0aW9uKHsgc3RhdHMgfSlcbiAgICB9XG5cbiAgICBpZiAocnVubmVyLnN0YXRzLmZhaWx1cmVzICYmIHRoaXMuI3NldHRpbmdzLm5vdGlmeU9uRmFpbHVyZSkge1xuICAgICAgdGhpcy5zaG93RmFpbHVyZU5vdGlmaWNhdGlvbih7IHN0YXRzIH0pXG4gICAgfVxuICB9XG5cbiAgZGlkU3RhcnRTdWl0ZSh7IHN1aXRlIH0pIHtcbiAgICB0aGlzLmNvbnNvbGUuZGlkU3RhcnRTdWl0ZSh7IHN1aXRlIH0pXG4gIH1cblxuICBkaWRGaW5pc2hUZXN0KCkge1xuICAgIHRoaXMuc3RhdHMuY29tcGxldGVkKytcbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcih0aGlzLnN0YXRzLmNvbXBsZXRlZCAvIHRoaXMuc3RhdHMudG90YWwgKiAxMDApXG5cbiAgICB0aGlzLnNwaW5uZXIuc2V0VGl0bGUoYFJ1bm5pbmcgTW9jaGEgdGVzdHM6ICR7TWF0aC5mbG9vcihwZXJjZW50KX0lYClcbiAgfVxuXG4gIGRpZFBhc3NUZXN0KHsgdGVzdCB9KSB7XG4gICAgdGhpcy5jb25zb2xlLmRpZFBhc3NUZXN0KHsgdGVzdCB9KVxuICB9XG5cbiAgZGlkRmFpbFRlc3QoeyB0ZXN0LCBlcnIgfSkge1xuICAgIHRoaXMuY29uc29sZS5kaWRGYWlsVGVzdCh7IHRlc3QsIGVyciB9KVxuICAgIHRoaXMubGludGVyLmRpZEZhaWxUZXN0KHsgdGVzdCwgZXJyIH0pXG4gIH1cblxuICBkaWRTa2lwVGVzdCh7IHRlc3QgfSkge1xuICAgIHRoaXMuY29uc29sZS5kaWRTa2lwVGVzdCh7IHRlc3QgfSlcbiAgfVxuXG4gIHNob3dTdWNjZXNzTm90aWZpY2F0aW9uKHsgc3RhdHMgfSkge1xuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRTdWNjZXNzKCdUZXN0IHN1aXRlIHBhc3NlZC4nLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJyoqSURFLU1vY2hhKionLFxuICAgICAgZGV0YWlsOiBzdGF0cyxcbiAgICB9KVxuICB9XG5cbiAgc2hvd0ZhaWx1cmVOb3RpZmljYXRpb24oeyBzdGF0cyB9KSB7XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdUZXN0IHN1aXRlIGZhaWxlZC4nLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJyoqSURFLU1vY2hhKionLFxuICAgICAgZGV0YWlsOiBzdGF0cyxcbiAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgIHRleHQ6ICdPcGVuIENvbnNvbGUnLFxuICAgICAgICBvbkRpZENsaWNrOiAoKSA9PiB0aGlzLmNvbnNvbGUuZm9jdXMoKSxcbiAgICAgIH1dLFxuICAgIH0pXG4gIH1cblxuICBwcmludEFkZHJlc3NJbmZvKCkge1xuICAgIGNvbnN0IGFkZHJlc3MgPSB1dGlsLm1rYWRkcmVzc2luZm8oeyBhZGRyZXNzOiB0aGlzLiNyZW1vdGUuYWRkcmVzcygpIH0pXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuI3NldHRpbmdzLmludGVyZmFjZVxuXG4gICAgdGhpcy5jb25zb2xlLnByaW50QWRkcmVzc0luZm8oeyBhZGRyZXNzLCB0eXBlIH0pXG4gIH1cblxuICBjb3B5UmVjZWl2ZXJBZGRyZXNzKCkge1xuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKHRoaXMuI3NldHRpbmdzLmFkZHJlc3MpXG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oJ0NvcGllZCEnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJyoqSURFLU1vY2hhKionLFxuICAgIH0pXG4gIH1cblxuICBjb3B5TW9jaGFDb21tYW5kKCkge1xuICAgIGNvbnN0IGFkZHJlc3MgPSB0aGlzLiNzZXR0aW5ncy5hZGRyZXNzXG4gICAgY29uc3QgY29tbWFuZCA9IHV0aWwubWtjb21tYW5kaW5mbyh7IGFkZHJlc3MgfSlcblxuICAgIGF0b20uY2xpcGJvYXJkLndyaXRlKGNvbW1hbmQpXG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oJ0NvcGllZCEnLCB7XG4gICAgICBkZXNjcmlwdGlvbjogJyoqSURFLU1vY2hhKionLFxuICAgIH0pXG4gIH1cblxuICBzaG93SGVscCgpIHtcbiAgICBjb25zdCBhZGRyZXNzID0gdGhpcy4jc2V0dGluZ3MuYWRkcmVzc1xuICAgIGNvbnN0IGNvbW1hbmQgPSB1dGlsLm1rY29tbWFuZGluZm8oeyBhZGRyZXNzIH0pXG4gICAgY29uc3QgaGVscCA9IEhFTFBfVEVNUExBVEUucmVwbGFjZSgnI3tDT01NQU5EfScsIGNvbW1hbmQpXG5cbiAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkSW5mbygnSURFLU1vY2hhOiBIZWxwJywge1xuICAgICAgZGVzY3JpcHRpb246IGhlbHAsXG4gICAgICBpY29uOiAnbW9ydGFyLWJvYXJkJyxcbiAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgYnV0dG9uczogW3tcbiAgICAgICAgLy8gRXh0cmEgc3BhY2UgdG8gbWFrZSByb29tIGJldHdlZW4gdGhlIGNsaXBweSBpY29uIGFuZCB0ZXh0IPCfjqhcbiAgICAgICAgdGV4dDogJyBDb3B5IE1vY2hhIGNvbW1hbmQgdG8gY2xpcGJvYXJkJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnYnRuIGJ0bi1pbmZvIGljb24tY2xpcHB5IHNlbGVjdGVkJyxcbiAgICAgICAgb25EaWRDbGljaygpIHtcbiAgICAgICAgICBhdG9tLmNsaXBib2FyZC53cml0ZShjb21tYW5kKVxuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRTdWNjZXNzKCdDb3BpZWQhJywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICcqKklERS1Nb2NoYSoqJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgfV0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQge1xuICBJZGVNb2NoYSxcbn1cbiJdfQ==