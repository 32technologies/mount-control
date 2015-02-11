var util = require('util');
var EventEmitter = require('events').EventEmitter;
var exec = require('child_process').exec;
//var Mount = function() {};

util.inherits(MountControl, EventEmitter);

function MountControl() {
	EventEmitter.call(this);
}

MountControl.prototype.remount = function(path, readonly) {
	var _this = this;
	var flags = "rw";
	if (readonly === true) {
		flags = "ro";
	}
	exec('sudo mount ' + path + ' -o remount,' + flags, function(error, stdout, stderr) {
		if (error !== null) {
			_this.emit('remountFailed', stderr);
		} else {
			_this.emit('remountFinished', readonly);
		}
	});
};

module.exports = MountControl;
