# easy-mtx

**easy-mtx** is a lightweight, easy-to-use JavaScript mutex and pool implementation for managing concurrent access to critical sections of code.

Note: This package is primarily intended for personal usage. Feel free to try it out, but be aware that it might not be suitable for all production scenarios.

## Installation

Install the package via npm:

```bash
npm install easy-mtx
```

## Usage

### Example

```javascript
import { Pool, Mutex } from "easy-mtx";
import express from "express";

// or use const { Pool, Mutex } = require('easy-mtx')

const app = express();

const pool = new Pool(5); // Create a pool with a concurrency level of 5
const mutex = new Mutex(); // Create a mutex instance

const obj = {
  count: 0,
};

// Route to increment obj.count in a mutex-protected context synchronously
app.get("/mutex-sync-context", async (req, res) => {
  const result = await mutex.runInContext(() => {
    return obj.count++;
  });

  res.json(obj);
});

// Route to increment obj.count in a mutex-protected context asynchronously
app.get("/mutex-async-context", async (req, res) => {
  const result = await mutex.runInAsyncContext(async () => {
    return obj.count++;
  });

  res.json(obj);
});

// Route to increment obj.count in a pool-protected context synchronously
app.get("/pool-sync-context", async (req, res) => {
  // Will start blocking when the number of requests exceeds the concurrency level of the pool
  const result = await pool.runInContext(() => {
    return obj.count++;
  });

  res.json(obj);
});

// Route to increment obj.count in a pool-protected context asynchronously
app.get("/pool-async-context", async (req, res) => {
  // Will start blocking when the number of requests exceeds the concurrency level of the pool
  const result = await pool.runInAsyncContext(async () => {
    return obj.count++;
  });

  res.json(obj);
});

app.listen(8000); // Start the server
```

## API

### `Mutex`

- `Mutex()` - Constructor function to create a new mutex instance.

##### Methods

- `runInAsyncContext(asyncFunction)`: Runs the provided async function in a mutex-protected context.
- `runInContext(syncFunction)`: Runs the provided synchronous function in a mutex-protected context.

### `Pool`

- `Pool(concurrency)`: Constructor function to create a new pool instance with the specified concurrency level.

##### Methods

- `runInAsyncContext(asyncFunction)`: Runs the provided async function in a pool-protected context.
- `runInContext(syncFunction)`: Runs the provided synchronous function in a pool-protected context.
