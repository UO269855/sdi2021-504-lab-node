let express = require('express');
let app = express();


let swig = require('swig');
let bodyParser = require('body-parser');
let mongo = require('mongodb');
let fileUpload = require('express-fileupload');
let gestorBD = require("./modules/gestorBD.js");
let crypto = require('crypto');
let expressSession = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(fileUpload());
app.use(expressSession({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true
}));


gestorBD.init(app,mongo);

// routerUsuarioSession
var routerUsuarioSession = express.Router();
routerUsuarioSession.use(function(req, res, next) {
    console.log("routerUsuarioSession");
    if ( req.session.usuario ) {
        // dejamos correr la petición
        next();
    } else {
        console.log("va a : "+req.session.destino)
        res.redirect("/identificarse");
    }
});
//Aplicar routerUsuarioSession
app.use("/canciones/agregar",routerUsuarioSession);
app.use("/publicaciones",routerUsuarioSession);

//routerAudios
let routerAudios = express.Router();
routerAudios.use(function(req, res, next) {
    console.log("routerAudios");
    let path = require('path');
    let idCancion = path.basename(req.originalUrl, '.mp3');
    gestorBD.obtenerCanciones(
        {"_id": mongo.ObjectID(idCancion) }, function (canciones) {
            if(req.session.usuario && canciones[0].autor == req.session.usuario ){
                next();
            } else {
                res.redirect("/tienda");
            }
        })
});
//Aplicar routerAudios
app.use("/audios/",routerAudios);


app.set('port', 8081);
app.set('db', 'mongodb://admin:sdi@tiendamusica-shard-00-00.slqan.mongodb.net:27017,tiendamusica-shard-00-01.slqan.mongodb.net:27017,tiendamusica-shard-00-02.slqan.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-evponj-shard-0&authSource=admin&retryWrites=true&w=majority');
app.set('clave','abcdefg');
app.set('crypto',crypto);

require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rautores.js")(app, swig); // (app, param1, param2, etc.)

app.listen(app.get('port'), function() {
    console.log('Servidor Activo');
})