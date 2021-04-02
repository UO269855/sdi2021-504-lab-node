let express = require('express');
let app = express();


let swig = require('swig');
let bodyParser = require('body-parser');
let mongo = require('mongodb');
let fileUpload = require('express-fileupload');
let gestorBD = require("./modules/gestorBD.js");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());


gestorBD.init(app,mongo);

app.set('port', 8081);
app.set('db', 'mongodb://admin:sdi@tiendamusica-shard-00-00.slqan.mongodb.net:27017,tiendamusica-shard-00-01.slqan.mongodb.net:27017,tiendamusica-shard-00-02.slqan.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-evponj-shard-0&authSource=admin&retryWrites=true&w=majority');


require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rautores.js")(app, swig); // (app, param1, param2, etc.)

app.listen(app.get('port'), function() {
    console.log('Servidor Activo');
})