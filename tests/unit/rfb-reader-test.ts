import { module, test } from 'qunit';
import RfbReader from 'ember-vnc/rfb-reader';
import { WritableStreamBuffer } from 'stream-buffers';

module('Unit | RfbReader', hooks => {
  let reader: RfbReader;
  let output: WritableStreamBuffer;

  hooks.beforeEach(() => {
    reader = new RfbReader();
    output = new WritableStreamBuffer();
    reader.pipe(output);
  });

  test('it negotiates ProtocolVersion', async assert => {
    return new Promise<void>((resolve, reject) => {
      reader.write('RFB 003.008\n', 'ascii');
      reader.on('error', reject);
      reader.end(() => {
        assert.equal(output.getContents().toString('ascii', 4, 11), '003.008');
        resolve();
      });
    });
  });
});
