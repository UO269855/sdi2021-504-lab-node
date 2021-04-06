module.exports = function(app, swig, gestorBD) {

    app.post('/comentarios/:id', function (req, res) {
        if ( req.session.usuario == null){
            res.send("Error al insertar comentario");
        }

        let id = req.params.id;
        let comentario = {
            autor : req.session.usuario,
            texto : req.body.texto,
            cancion_id : gestorBD.mongo.ObjectID(id)
        }
        gestorBD.anadirComentario(comentario, function(id) {
            if (id == null) {
                res.send("Error al insertar comentario");
            } else {
                res.send("Agregado nuevo comentario");
            }
        });
    });
};