const express = require("express")
const server = express()


const projectsRouter = require('./api/projectsRouter');
const actionsRouter = require('./api/actionsRouter');

server.use(express.json())
server.use(logger)


function logger (req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
            )}`
            )
            next();
}

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;