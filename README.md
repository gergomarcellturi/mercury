# Mercury

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Develop acsross all platforms
Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.

## Spees & performance
Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering.

Angular puts you in control over scalability. Meet huge data requirements by building data models on RxJS, Immutable.js or another push-model.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Setup
Use npm to install Protractor globally with:

npm install -g protractor
This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

webdriver-manager update
Now start up a server with:

webdriver-manager start
This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. You can see information about the status of the server at http://localhost:4444/wd/hub.

## Write a test
Open a new command line or terminal window and create a clean folder for testing.

Protractor needs two files to run, a spec file and a configuration file.

Let's start with a simple test that navigates to the todo list example in the AngularJS website and adds a new todo item to the list.

Copy the following into todo-spec.js:

The describe and it syntax is from the Jasmine framework. browser is a global created by Protractor, which is used for browser-level commands such as navigation with browser.get.

##Configuration
Now create the configuration file. Copy the following into conf.js:

exports.config = {
seleniumAddress: 'http://localhost:4444/wd/hub',
specs: ['todo-spec.js']
};
This configuration tells Protractor where your test files (specs) are, and where to talk to your Selenium Server (seleniumAddress). It will use the defaults for all other configuration. Chrome is the default browser.

##Run the test
Now run the test with:

protractor conf.js
You should see a Chrome browser window open up and navigate to the todo list in the AngularJS page, then close itself (this should be very fast!). The test output should be 1 test, 3 assertions, 0 failures. Congratulations, you've run your first Protractor test!

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## The Goal of Angular CLI

The Angular CLI creates, manages, builds and test your Angular projects. It's built on top of the Angular DevKit.


## The Goal of DevKit

DevKit's goal is to provide a large set of libraries that can be used to manage, develop, deploy and analyze your code.

## Installation
To get started locally, follow these instructions:

1.If you haven't done it already, make a fork of this repo.
2.Clone to your local computer using git.
3.Make sure that you have Node 10.13 or later installed. See instructions here.
4.Make sure that you have yarn installed; see instructions here.
5.Run yarn (no arguments) from the root of your clone of this project to install dependencies.

## Building and Installing the CLI
To make a local build:

yarn build --local
This generates a number of tarballs in the dist/ directory. To actually use the locally built tools, switch to another repository reproducing the specific issue you want to fix (or just generate a local repo with ng new). Then install the locally built packages:

cd "${EXAMPLE_ANGULAR_PROJECT_REPO}"
npm install -D ${CLI_REPO}/dist/*.tgz
Builds of this example project will use tooling created from the previous local build and include any local changes. When using the CLI, it will automatically check for a local install and use that if present. This means you can just run:

npm install -g @angular/cli
to get a global install of the latest CLI release. Then running any ng command in the example project will automatically find and use the local build of the CLI.

Note: If you are testing ng update, be aware that installing all the tarballs will also update the framework (@angular/core) to the latest version. In this case, simply install the CLI alone with npm install -D ${CLI_REPO}/dist/_angular_cli.tgz, that way the rest of the project remains to be upgraded with ng update.

## Debugging
To debug an invocation of the CLI, build and install the CLI for an example project, then run the desired ng command as:

node --inspect-brk node_modules/.bin/ng ...
This will trigger a breakpoint as the CLI starts up. You can connect to this using the supported mechanisms for your IDE, but the simplest option is to open Chrome to chrome://inspect and then click on the inspect link for the node_modules/.bin/ng Node target.

Unfortunately, the CLI dynamically require()'s other files mid-execution, so the debugger is not aware of all the source code files before hand. As a result, it is tough to put breakpoints on files before the CLI loads them. The easiest workaround is to use the debugger; statement to stop execution in the file you are interested in, and then you should be able to step around and set breakpoints as expected.

## Testing
There are two different test suites which can be run locally:

Unit tests
Run all tests: yarn bazel test //packages/...
Run a subset of the tests, use the full Bazel target example: yarn bazel test //packages/schematics/angular:angular_test
For a complete list of test targets use the following Bazel query: yarn bazel query "tests(//packages/...)"
You can find more info about debugging [tests with Bazel in the docs.] (https://github.com/angular/angular-cli/blob/master/docs/process/bazel.md#debugging-jasmine_node_test)

End to end tests
Run: node tests/legacy-cli/run_e2e.js
Run a subset of the tests: node tests/legacy-cli/run_e2e.js tests/legacy-cli/e2e/tests/i18n/ivy-localize-*
When running the debug commands, Node will stop and wait for a debugger to attach. You can attach your IDE to the debugger to stop on breakpoints and step through the code. Also, see IDE Specific Usage for a simpler debug story.

When debugging a specific test, change describe() or it() to fdescribe() and fit() to focus execution to just that one test. This will keep the output clean and speed up execution by not running irrelevant tests.

### IDE Specific Usage
Some additional tips for developing in specific IDEs.

Intellij IDEA / WebStorm
To load the project in Intellij products, simply Open the repository folder. Do not Import Project, because that will overwrite the existing configuration.

Once opened, the editor should automatically detect run configurations in the workspace. Use the drop down to choose which one to run and then click the Run button to start it. When executing a debug target, make sure to click the Debug icon to automatically attach the debugger (if you click Run, Node will wait forever for a debugger to attach).

### Creating New Packages
Adding a package to this repository means running two separate commands:

schematics devkit:package PACKAGE_NAME. This will update the .monorepo file, and create the base files for the new package (package.json, src/index, etc).
devkit-admin templates. This will update the README and all other template files that might have changed when adding a new package.
For private packages, you will need to add a "private": true key to your package.json manually. This will require re-running the template admin script.
