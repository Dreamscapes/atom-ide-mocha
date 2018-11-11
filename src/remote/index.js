"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remote = remote;

var _net = _interopRequireDefault(require("net"));

var _fs = _interopRequireDefault(require("fs"));

var _splitterTransform = require("./splitter-transform");

var _jsonTransform = require("./json-transform");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function remote({
  address,
  receiver
}) {
  if (typeof address === 'string') {
    try {
      _fs.default.accessSync(address);

      _fs.default.unlinkSync(address);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        _fs.default.unlinkSync(address);
      }
    }
  }

  return _net.default.createServer(req => req.pipe(new _splitterTransform.SplitterTransform()).pipe(new _jsonTransform.JSONTransform()).on('data', ({
    event,
    args
  }) => {
    receiver.emit(event, ...args);
  })).listen(address);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lm1qcyJdLCJuYW1lcyI6WyJyZW1vdGUiLCJhZGRyZXNzIiwicmVjZWl2ZXIiLCJmcyIsImFjY2Vzc1N5bmMiLCJ1bmxpbmtTeW5jIiwiZXJyIiwiY29kZSIsIm5ldCIsImNyZWF0ZVNlcnZlciIsInJlcSIsInBpcGUiLCJTcGxpdHRlclRyYW5zZm9ybSIsIkpTT05UcmFuc2Zvcm0iLCJvbiIsImV2ZW50IiwiYXJncyIsImVtaXQiLCJsaXN0ZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLFNBQVNBLE1BQVQsQ0FBZ0I7QUFBRUMsRUFBQUEsT0FBRjtBQUFXQyxFQUFBQTtBQUFYLENBQWhCLEVBQXVDO0FBRXJDLE1BQUksT0FBT0QsT0FBUCxLQUFtQixRQUF2QixFQUFpQztBQUUvQixRQUFJO0FBQ0ZFLGtCQUFHQyxVQUFILENBQWNILE9BQWQ7O0FBQ0FFLGtCQUFHRSxVQUFILENBQWNKLE9BQWQ7QUFDRCxLQUhELENBR0UsT0FBT0ssR0FBUCxFQUFZO0FBQ1osVUFBSUEsR0FBRyxDQUFDQyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekJKLG9CQUFHRSxVQUFILENBQWNKLE9BQWQ7QUFDRDtBQUNGO0FBRUY7O0FBRUQsU0FBT08sYUFBSUMsWUFBSixDQUFpQkMsR0FBRyxJQUN6QkEsR0FBRyxDQUNBQyxJQURILENBQ1EsSUFBSUMsb0NBQUosRUFEUixFQUVHRCxJQUZILENBRVEsSUFBSUUsNEJBQUosRUFGUixFQUdHQyxFQUhILENBR00sTUFITixFQUdjLENBQUM7QUFBRUMsSUFBQUEsS0FBRjtBQUFTQyxJQUFBQTtBQUFULEdBQUQsS0FBcUI7QUFDL0JkLElBQUFBLFFBQVEsQ0FBQ2UsSUFBVCxDQUFjRixLQUFkLEVBQXFCLEdBQUdDLElBQXhCO0FBQ0QsR0FMSCxDQURLLEVBT0pFLE1BUEksQ0FPR2pCLE9BUEgsQ0FBUDtBQVFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5ldCBmcm9tICduZXQnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgeyBTcGxpdHRlclRyYW5zZm9ybSB9IGZyb20gJy4vc3BsaXR0ZXItdHJhbnNmb3JtJ1xuaW1wb3J0IHsgSlNPTlRyYW5zZm9ybSB9IGZyb20gJy4vanNvbi10cmFuc2Zvcm0nXG5cbmZ1bmN0aW9uIHJlbW90ZSh7IGFkZHJlc3MsIHJlY2VpdmVyIH0pIHtcbiAgLy8gRW5zdXJlIHRoZSBzb2NrZXQgZG9lcyBub3QgZXhpc3QgZmlyc3RcbiAgaWYgKHR5cGVvZiBhZGRyZXNzID09PSAnc3RyaW5nJykge1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXN5bmMgKi9cbiAgICB0cnkge1xuICAgICAgZnMuYWNjZXNzU3luYyhhZGRyZXNzKVxuICAgICAgZnMudW5saW5rU3luYyhhZGRyZXNzKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5jb2RlICE9PSAnRU5PRU5UJykge1xuICAgICAgICBmcy51bmxpbmtTeW5jKGFkZHJlc3MpXG4gICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgfVxuXG4gIHJldHVybiBuZXQuY3JlYXRlU2VydmVyKHJlcSA9PlxuICAgIHJlcVxuICAgICAgLnBpcGUobmV3IFNwbGl0dGVyVHJhbnNmb3JtKCkpXG4gICAgICAucGlwZShuZXcgSlNPTlRyYW5zZm9ybSgpKVxuICAgICAgLm9uKCdkYXRhJywgKHsgZXZlbnQsIGFyZ3MgfSkgPT4ge1xuICAgICAgICByZWNlaXZlci5lbWl0KGV2ZW50LCAuLi5hcmdzKVxuICAgICAgfSkpXG4gICAgLmxpc3RlbihhZGRyZXNzKVxufVxuXG5leHBvcnQge1xuICByZW1vdGUsXG59XG4iXX0=