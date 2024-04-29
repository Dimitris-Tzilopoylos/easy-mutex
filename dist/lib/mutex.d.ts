export = Mutex;
declare class Mutex {
  _locks: any[];
  isLocked: boolean;
  isProcessing: boolean;
  sleep(seconds: any): Promise<any>;
  acquire(): any;
  lock(): Promise<any>;
  getLock(): any;
  isEmpty(): boolean;
  dispatch(): void;
  release(): void;
  _process(lock: any): void;
  runInAsyncContext(cb: () => Promise<any>): Promise<any>;
  runInContext(cb: () => any): Promise<any>;
}
