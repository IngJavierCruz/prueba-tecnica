const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.db = router.db

server.use(auth)
server.use(router)
server.listen(3000, () => {
  console.log('App Server is running')
})
