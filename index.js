const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')

let startPort = taskParams
  ? (taskParams.p || 3000) * 1
  : ctx.options.server ? ctx.options.server.port : 3000

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
      ctx.logger.warn(`port ${port} is already in used.`)
      listen(app)
    })
  })
}

async function start() {
  try {
    const app = new Koa()
    app.use(serve(root))

    const port = await listen(app)
    ctx.logger.success(`Server runing at http://${host}:${port}`)
    ctx.logger.info(`Server root: ${root}`)
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = start
