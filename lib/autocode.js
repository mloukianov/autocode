// Generated by CoffeeScript 1.9.3
(function() {
  var autocode, path;

  path = require('path');

  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

  global.ErrorInvalid = function(name, type) {
    this.name = 'ErrorInvalid';
    return this.message = "'" + name + "' is invalid.";
  };

  global.ErrorInvalid.prototype = Error.prototype;

  global.ErrorType = function(name, type) {
    this.name = 'ErrorType';
    return this.message = "'" + name + "' must be of type (" + type + ").";
  };

  global.ErrorType.prototype = Error.prototype;

  global.ErrorRequired = function(name) {
    this.name = 'ErrorRequired';
    return this.message = "'" + name + "' is required.";
  };

  global.ErrorRequired.prototype = Error.prototype;

  autocode = function(config) {
    var i, len, match, message, method, methods, validate;
    methods = ['build', 'cache', 'generate', 'init', 'install', 'load', 'run', 'save', 'search', 'stop', 'test', 'update', 'validate'];
    for (i = 0, len = methods.length; i < len; i++) {
      method = methods[i];
      this[method] = require("./autocode/" + method);
    }
    if (typeof config === 'object') {
      validate = this.validate(config);
      if (!validate.valid) {
        match = 'Failed "type" criteria:';
        if (validate.errors[0].message.match(match)) {
          message = validate.errors[0].message.replace(/Failed "type" criteria: expecting (.*?), found (.*?)$/, "`" + (validate.errors[0].context.substr(2)) + "` must be a `$1`, not a `$2`.");
          message = message.replace(/\ or\ /, '` or `');
          throw new Error(message);
        }
        match = 'Failed "required" criteria:';
        if (validate.errors[0].message.match(match)) {
          message = validate.errors[0].message.replace(/Failed "required" criteria: missing property \((.*?)\)$/, "`" + (validate.errors[0].context.substr(2).replace(/\//, '.')) + ".$1` is required.");
          message = message.replace(/\ or\ /, '` or `');
          throw new Error(message);
        }
        console.log(validate);
        throw new Error("Config is invalid.");
      }
      this.config = config;
      this.path = this.config.path ? this.config.path : process.cwd();
    } else if (typeof config === 'string') {
      this.config = this.load(config);
      this.path = this.config.path ? this.config.path : config;
    } else {
      this.config = {};
      this.path = process.cwd();
    }
    if (!this.path.match(/^\//)) {
      this.path = path.normalize((process.cwd()) + "/" + this.path);
    }
    if (this.config === false) {
      throw new Error("Unable to load config for (" + path + ").");
    }
    if (!this.config.host) {
      this.config.host = 'github.com';
    }
    return this;
  };

  module.exports = autocode;

}).call(this);