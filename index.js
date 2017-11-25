const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')

// Get task params
const taskParams = ctx.task.getParams('serve')

// Service start port
let startPort = taskParams.port * 1 || 3000

const host = ctx.options.server
  ? ctx.options.server.host || 'localhost'
  : 'localhost'
const root = ctx.options.server ? ctx.options.server.root || '.' : '.'

function listen(app) {
  return new Promise((resolve, reject) => {
    let port = startPort
    startPort += 1
    const server = http.createServer(app.callback())

    server.listen(port, err => {
      server.once('close', () => {
        app.listen(port, err => {
          return err ? reject(err) : resolve(port)
        })
      })
      server.close()
    })
    server.on('error', err => {
      ctx.logger.warn(`Port ${port} is already in use, trying ${startPort}...`)
      resolve(listen(app))
    })
  })
}

async function start() {
  try {
    const app = new Koa()
    app.use(serve(root))
    const port = await listen(app)
    ctx.logger.success(`Server runing at http://${host}:${port}`)
    ctx.logger.log(`Server root: ${root}`)
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = start
