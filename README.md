# grunt-clean-translate

> Use to determine which translation keys are missing or stale.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-clean-translate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-clean-translate');
```

## The "clean_translate" task

### Overview
In your project's Gruntfile, add a section named `clean_translate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  clean_translate: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.translationFile
Type: `String`
Default value: null
Required

A string value that is the path to the json file of your translations.

#### options.matches
Type: `Array`
Default value: []
Required

An array of regular expression for matching in your source.

### Usage Examples

#### Default Options
In this example, we are checking a JS/HTML with and comparing it with keys found in the `en.json` file.  The results will be saved to the tmp folder.

```js
grunt.initConfig({
  clean_translate: {
    en: {
      options: {
        translationFile: 'en.json',
        matches: [
          new RegExp('translate="([A-Za-z0-9_\\\.]+)*"', 'gi'),
          new RegExp("'([A-Za-z0-9_\\\.]+)*' \\\| translate", 'gi'),
          new RegExp("i18n.t\\\('([A-Za-z0-9_\\\.]+)*'", 'gi')
        ]
      },
      files: {
        'tmp': ['testing.js', '123.html']
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
