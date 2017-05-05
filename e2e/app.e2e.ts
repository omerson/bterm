const Application = require('spectron').Application;
import { expect, should } from 'chai';
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
const path = require('path');

chai.should();
chai.use(chaiAsPromised);

describe('bterm launch', function() {
  let timeOut = (mseconds) => this.timeout(mseconds);
  timeOut(10000);

  let electronPath = path.join(__dirname, '../..', 'node_modules', '.bin', 'electron');
  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')],
      env: { SPECTRON: true }
    })
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
    return this.app.start();
  })

  afterEach(() => {
    timeOut(10000);
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  })

  it('should show an initial window', () => {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  })

   it('should be visible', () => {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isVisible().should.eventually.be.true
  })

  it('should not be minimized', () => {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isMinimized().should.eventually.be.false;
  })

  it('should be focused', () => {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isFocused().should.eventually.be.true;
  })

  // it('should minimize the application', () => {
  //   return this.app.client.click('.minimize').then(() => {
  //     this.app.client.browserWindow.isMinimized().then((isMinimized) => {
  //       expect(isMinimized).to.be.equal(true);
  //     });
  //   });
  // })

  it('should have a width', () => {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0);
  })

  it('should have a height', () => {
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0);
  })

  it('should have the app title', () => {
    return this.app.client.browserWindow.getTitle().should.eventually.equal('bterm');
  })

  it('should have the shell title', () => {
    return this.app.client.getText('.title').should.eventually.equal('Shell');
  })

  // it('should have focus after click', () => {
  //   return this.app.client.click('.terminal-instance').then(() => {
  //     this.app.client.hasFocus('.terminal-instance').then((hasFocus) => {
  //       expect(hasFocus).to.be.equal(true);
  //     });
  //   });
  // })

  // it('should open the right menu', () => {
  //   return this.app.client.click('.menu-open').then(() => {
  //     this.app.client.isVisible('.sidebar-container').then((isVisible) => {
  //       expect(isVisible).to.be.equal(true);
  //     });
  //   });
  // })

  // it('should have correct text on right menu', () => {
  //   return this.app.client.click('.menu-open').then(() => {
  //     this.app.client.getText('.sidebar-container > h1').then((text) => {
  //       expect(text).to.be.equal('Theme Browser');
  //     });
  //   });
  // })

  // it('should have clicked theme selected', () => {
  //   return this.app.client.click('.menu-open').then(() => {
  //     this.app.client.click('.theme-browser > span:nth-child(2)').then(() => {
  //       this.app.client.isSelected('.theme-browser > span:nth-child(2)').then((isSelected) => {
  //         expect(isSelected).to.be.equal(false);
  //       });
  //     });
  //   });
  // })

})

