var cheerio = require("cheerio")
var crypto = require("crypto")

var task = function(grunt, filepath, options){
  var src = grunt.file.read(filepath)
  return src
}

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('{%= short_name %}', '{%= description %}', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    })

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath){
        var dest = task(grunt, filepath, options)
        if(dest){
          // Write the destination file.
          grunt.file.write(f.dest, dest)
          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.')
        }
      })
    })
  })

}