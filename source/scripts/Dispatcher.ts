type DispatchToken = string;
const _prefix = 'ID_';

class Dispatcher<TPayload> {
  private _callbacks: {[key: DispatchToken]: (payload: TPayload) => void};
  private _isDispatching: boolean;
  private _isHandled: {[key: DispatchToken]: boolean};
  private _isPending: {[key: DispatchToken]: boolean};
  private _lastID: number;
  private _pendingPayload: TPayload;

  constructor() {
    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */
  public register(callback: (payload: TPayload) => void): DispatchToken {
    const id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  }

  /**
   * Removes a callback based on its token.
   */
  public unregister(id: DispatchToken): void {
    delete this._callbacks[id];
  }

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */
  public waitFor(ids: DispatchToken[]): void {
    for (const id of ids) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  }

  /**
   * Dispatches a payload to all registered callbacks.
   */
  public dispatch(payload: TPayload): void {
    this._startDispatching(payload);
    try {
      for (const id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  }

  /**
   * Is this Dispatcher currently dispatching.
   */
  public isDispatching(): boolean {
    return this._isDispatching;
  }

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */
  private _invokeCallback(id: DispatchToken): void {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  }

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */
  private _startDispatching(payload: TPayload): void {
    for (const id of Object.keys(this._callbacks)) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  }

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  private _stopDispatching(): void {
    delete this._pendingPayload;
    this._isDispatching = false;
  }
}

export default Dispatcher;
