const Mutex = require("./mutex");

class Pool {
  constructor(size) {
    this.size = parseInt(size);
    this.pool = [];
    this._validateSize();
    this._generateMutexes();
  }

  _findAvailableMutex() {
    return (
      this.pool.find((mutex) => !mutex.isLocked && !mutex.isProcessing) ||
      this.pool[0]
    );
  }

  async runInContext(cb) {
    return await this._findAvailableMutex().runInContext(cb);
  }

  async runInAsyncContext(cb) {
    return await this._findAvailableMutex().runInAsyncContext(cb);
  }

  _generateMutexes() {
    for (let i = 0; i < this.size; i++) {
      this.pool.push(new Mutex());
    }
  }

  _validateSize() {
    if (isNaN(this.size) || this.size <= 0) {
      throw new Error(`Pool size should be at least 1`);
    }

    if (this.size === 1) {
      console.warn(
        `Warning: Please consider that Pool with size 1 could be a simple Mutex instance`
      );
    }
  }
}

module.exports = Pool;
