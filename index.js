const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')

/** crear conexion a la base de datos */
const db = require('./config/db')

/** importar el modelo */
require('./models/Projects')

db.sync()
	.then(() => console.log('exito, conexion al servidor'))
	.catch((error) => console.log(error))

/** crear una app de express */
const app = express()

/** donde cargar los archivos estaticos */
app.use(express.static('public'))

/** habilitar pug */
app.set('view engine', 'pug')

/** añadir carpeta de las vistas */
app.set('views', path.join(__dirname, './views'))

/** habilitar bodyParser para leer datos del formulario */
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes())
app.listen(3000)
