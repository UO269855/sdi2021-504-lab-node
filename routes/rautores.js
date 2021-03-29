module.exports = function(app, swig) {

    app.get('/autores/agregar', function (req, res) {
        let respuesta = swig.renderFile('views/autores-agregar.html', {

        });
        res.send(respuesta);
    })

    app.post("/autor", function(req, res) {
        let result = "";
        if (req.query.nombre == "") {
            result += "Nombre no enviado en la petición <br>";
        }
        if (req.query.grupo == ""){
            result += "Grupo no enviado en la petición <br>";
        }
        else if (req.query.nombre != "" && req.query.grupo != ""){
            result = "Artista agregado:"+req.body.nombre +"<br>"
                +" grupo: " +req.body.grupo +"<br>"
                +" rol: "+req.body.rol
        }
        res.send(result);
    });

    app.get("/autores", function(req, res) {
        let autores = [{
            "nombre": "Alex",
            "grupo": "Monos del Ártico",
            "rol": "cantante"
        },{
            "nombre": "Connor",
            "grupo": "Solo Ladrones",
            "rol": "cantante"
        },{
            "nombre": "Flea",
            "grupo": "Chilis rojos picantes",
            "rol": "bajistas"
        }];

        let respuesta = swig.renderFile('views/autores.html', {
            vendedor : 'Datos de los autores',
            autores : autores
        });

        res.send(respuesta);
    });

    app.get("/autores*", function(req, res) {
        res.redirect("/autores");
    });

};
