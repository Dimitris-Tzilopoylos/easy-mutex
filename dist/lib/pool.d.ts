export = Pool;
declare class Pool {
  constructor(size: any);
  size: number;
  pool: any[];
  _findAvailableMutex(): any;
  runInAsyncContext(cb: () => Promise<any>): Promise<any>;
  runInContext(cb: () => any): Promise<any>;
  _generateMutexes(): void;
  _validateSize(): void;
}
