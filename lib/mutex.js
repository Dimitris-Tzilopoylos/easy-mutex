class Mutex {
  constructor() {
    this._locks = [];
    this.isLocked = false;
    this.isProcessing = false;
  }

  async sleep(seconds) {
    if (seconds <= 0) {
      return;
    }
    return new Promise((res) => setTimeout(res, seconds * 1000));
  }

  acquire() {
    return new Promise((resolve, reject) => {
      this._locks.push({ resolve, reject });
      this.dispatch();
    });
  }

  async lock() {
    return new Promise();
  }

  getLock() {
    return this._locks.shift();
  }

  isEmpty() {
    return this._locks.length === 0;
  }

  dispatch() {
    if (this.isEmpty()) {
      return;
    }
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    const lock = this.getLock();
    if (!lock) {
      this.isProcessing = false;
      return;
    }
    this._process(lock);
  }

  release() {
    this.isProcessing = false;
    this.dispatch();
  }

  _process(lock) {
    lock.resolve(this.release.bind(this));
  }

  async runInAsyncContext(cb) {
    let release;
    let result;
    try {
      release = await this.acquire();
      result = await cb();
    } catch (error) {
      result = error;
    } finally {
      if (release) {
        release();
      }

      return result;
    }
  }

  async runInContext(cb) {
    let release;
    let result;
    try {
      release = await this.acquire();
      result = cb();
    } catch (error) {
      result = error;
    } finally {
      if (release) {
        release();
      }

      return result;
    }
  }
}

module.exports = Mutex;
