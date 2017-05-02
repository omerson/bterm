import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/jasmine-patch';

import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
let Application = require('spectron').Application;
const path = require('path');

let app: any;

var electronPath = path.join(__dirname, '../..', 'node_modules', '.bin', 'electron');

beforeEach(() => {
  this.app = new Application({
    path: electronPath,
  args: [path.join(__dirname, '..')],
  env: { SPECTRON: true }
  })
})

describe(`bterm App`, () => {

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('should show an initial window', () => {
    this.app.start().then(() => {
      this.app.client.getWindowCount().then((count) => {
        console.log("Here I am");
        expect(count).toEqual(1);
      })
    });
  })

  it('should check the title', () => {
    this.app.start().then(() => {
      return this.app.client.browserWindow.getTitle().then(title => {
        expect(title).toEqual('bterm');
      });
    });
  })

  it('should open the right menu', () => {
    this.app.start().then(() => {
      return this.app.client.click('.menu-open').then(() => {
        this.app.client.isVisible('.sidebar-container').then((isVisible) => {
          expect(isVisible).toBeTruthy();
        });
      });
    });
  })

});
