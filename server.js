const express = require('express');

const projectRoute = require('./Projects/projects');

const actionRoute = require('./Actions/actions');

const server = express();

server.use(express.json());

server.use('/projects', projectRoute);
server.use('/actions',actionRoute);

// function logger(req, res, next) {
//     console.log(
//       `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
//         'Origin'
//       )}`
//     );
//     next();
//   };
  
  
  module.exports = server;
  