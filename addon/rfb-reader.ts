import { Transform } from 'stream';

enum State {
  WaitingForProtocol,
  WaitingForSecurityTypes
}

export default class RfbReader extends Transform {
  private _state = State.WaitingForProtocol;
  private _protocolVersion?: string;

  _transform(
    chunk: Buffer,
    _encoding: string,
    callback: (error?: Error, data?: any) => void
  ) {
    switch (this._state) {
      case State.WaitingForProtocol:
        if (chunk.byteLength < 12) {
          callback(new Error('Incomplete ProtocolVersion message'));
          return;
        }
        this._protocolVersion = chunk.toString('ascii', 4, 11);
        this._state = State.WaitingForSecurityTypes;
        this.push(`RFB ${this._protocolVersion}\n`, 'ascii');
        callback();
        break;
    }
  }
}
