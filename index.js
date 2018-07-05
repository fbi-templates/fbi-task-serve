const path = require('path')
const express = require('express')
const getPort = require('get-port')
const serveIndex = require('serve-index')

async function start () {
  try {
    const app = express()
    const siteRoot = process.cwd()
    const taskParams = ctx.task.getParams('serve')
    const startPort = taskParams.port * 1 || taskParams.p * 1 || 3000
    const port = await getPort({ port: startPort })

    app.use(express.static(siteRoot))
    app.use(
      serveIndex(siteRoot, {
        stylesheet: path.join(__dirname, './public/style.css')
      })
    )

    await app.listen(port)

    ctx.logger.log(`Server root: ${siteRoot}`)
    ctx.logger.success(`Server runing at http://localhost:${port}`)
  } catch (err) {
    ctx.logger.error(err)
  }
}

module.exports = start
