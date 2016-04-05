module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'dist/bower_components/angular/angular.js',
      'dist/bower_components/angular-mocks/angular-mocks.js',
      'dist/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js',
      'dist/scripts/app.min.js',
      'src/ng/**/*.test.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
