const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa()

let start = taskParams
  ? (taskParams.p || 3000) * 1
  : ctx.options.server ? ctx.options.server.port : 3000

const host = ctx.options.server
  ? ctx.options.server.host || 'localhost'
  : 'localhost'
const root = ctx.options.server ? ctx.options.server.root || '.' : '.'

// serve static
app.use(serve(root))

// auto selected a valid port & start server
function autoPortServer(cb) {
  let port = start
  start += 1
  const server = http.createServer(app.callback())

  server.listen(port, err => {
    server.once('close', () => {
      app.listen(port, err => {
        if (err) {
          ctx.log(err)
          return
        }
        cb(port)
      })
    })
    server.close()
  })
  server.on('error', err => {
    ctx.logger.warn(`port ${port} is already in used`)
    autoPortServer(cb)
  })
}

// listen
autoPortServer(port => {
  ctx.logger.success(`Server runing at http://${host}:${port}`)
  ctx.logger.info(`Server root: ${root}`)
})
