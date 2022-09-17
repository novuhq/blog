const { join } = require('path');

const fs = require('fs').promises;
const emptyFunction = async () => {};
const defaultAfterWritingNewFile = async (filename) =>
  console.log(`${filename} was written`);

class PuppeteerMassScreenshots {
  async init(page, socket, options = {}) {
    const runOptions = {
      beforeWritingImageFile: emptyFunction,
      afterWritingImageFile: defaultAfterWritingNewFile,
      beforeAck: emptyFunction,
      afterAck: emptyFunction,
      ...options,
    };
    // @ts-ignore
    this.socket = socket;
    // @ts-ignore
    this.page = page;
    // @ts-ignore
    this.client = await this.page.target().createCDPSession();
    // @ts-ignore
    this.canScreenshot = true;
    // @ts-ignore
    this.client.on('Page.screencastFrame', async (frameObject) => {
      // @ts-ignore
      if (this.canScreenshot) {
        await runOptions.beforeWritingImageFile();
        const filename = await this.writeImageFilename(frameObject.data);
        await runOptions.afterWritingImageFile(filename);
        try {
          await runOptions.beforeAck();
          // @ts-ignore
          await this.client.send('Page.screencastFrameAck', {
            sessionId: frameObject.sessionId,
          });
          await runOptions.afterAck();
        } catch (e) {
          // @ts-ignore
          this.canScreenshot = false;
        }
      }
    });
  }

  async writeImageFilename(data) {
    // @ts-ignore
    const fullHeight = await this.page.evaluate(() => {
      return Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
      );
    });
    return this.socket.emit('image', {img: data, fullHeight});
  }

  async start(options = {}) {
    const startOptions = {
      format: 'jpeg',
      quality: 10,
      everyNthFrame: 1,
      ...options,
    };
    try {
      // @ts-ignore
      await this.client?.send('Page.startScreencast', startOptions);
    } catch (err) {}
  }

  async stop() {
    try {
      // @ts-ignore
      await this.client?.send('Page.stopScreencast');
    } catch (err) {}
  }
}

module.exports = PuppeteerMassScreenshots;
