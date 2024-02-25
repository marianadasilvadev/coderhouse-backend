const io = require('socket.io')

const ProductsManager = require('../ProductsManager')

const productsManager = new ProductsManager('src/data/products.json')

const startConnection = (server) => {
  const socketServer = io(server)
  
  socketServer.on('connection', socket => {
    socket.on('load-products-client', async () => {
      const products = await productsManager.getAll()
  
      socket.emit('load-products-server', products)
    })
  })
}

module.exports = {
  startConnection
}
