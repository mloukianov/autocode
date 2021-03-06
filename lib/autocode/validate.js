// Generated by CoffeeScript 1.10.0
(function() {
  var fs, path, skeemas, validate, yaml;

  fs = require('fs');

  path = require('path');

  skeemas = require('skeemas');

  yaml = require('js-yaml');

  validate = function(config) {
    var config_schema, crystal_path;
    crystal_path = path.resolve(__dirname + "/../..");
    config_schema = yaml.safeLoad(fs.readFileSync(crystal_path + "/.autocode/config.yml"));
    config_schema = config_schema.exports.ConfigSchema.schema;
    validate = skeemas.validate(config, config_schema);
    return validate;
  };

  module.exports = validate;

}).call(this);
