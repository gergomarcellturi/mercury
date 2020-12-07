# Mercury

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

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
