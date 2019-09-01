import express from 'express';

import './database';

class App {
  constructor() {
    this.server = express();
    this.applyMiddlewares();
  }

  applyMiddlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
