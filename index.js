const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')
const app = new Koa()

let start = ctx.taskParams
  ? ctx.taskParams[0] * 1
  : (ctx.options.server.port || 9000)

// serve static
app.use(serve(ctx.options.server.root))

// auto selected a valid port & start server
function autoPortServer (cb) {
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
  ctx.logger.success(`Server runing at http://${ctx.options.server.host}:${port}`, 1)
  ctx.logger.info(`Server root: ${ctx.options.server.root || '.'}`)
})
