const Application = require('spectron').Application;
import { expect, should } from 'chai';
const path = require('path');

describe('bterm launch', function() {
  this.timeout(10000);

  let electronPath = path.join(__dirname, '../..', 'node_modules', '.bin', 'electron');
  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
    args: [path.join(__dirname, '..')],
    env: { SPECTRON: true }
    })
    return this.app.start();
  })

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  })

  it('should show an initial window', () => {
    return this.app.client.getWindowCount().then((count) => {
      expect(count).to.be.equal(1);
    })
  })

  it('should click on right menu', () => {
    return this.app.client.browserWindow.getTitle().then(title => {
      expect(title).to.be.equal('bterm');
    });
  })

  it('should open the right menu', () => {
    return this.app.client.click('.menu-open').then(() => {
      this.app.client.isVisible('.sidebar-container').then((isVisible) => {
        expect(isVisible).to.be.equal(true);
      });
    });
  })

})

