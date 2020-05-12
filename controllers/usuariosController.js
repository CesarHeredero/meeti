const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu Cuenta'
    });
};

exports.crearNuevaCuenta = async(req, res) => {
    const usuario = req.body;

    req.checkBody('confirmar', 'La repeticion de contraseña no puede ir vacia').notEmpty();
    req.checkBody('confirmar', 'La contraseña no coincide').equals(req.body.password);

    // leer errores express
    const erroresExpress = req.validationErrors();
    console.log(erroresExpress);

    try {
        const nuevoUsuario = await Usuarios.create(usuario);
        console.log('Usuario creado', nuevoUsuario);
    } catch (error) {
        const erroresSequelize = error.errors.map(err => err.message);
        const errExp = erroresExpress.map(err => err.msg);



        const listaErrores = [...erroresSequelize, ...errExp];
        console.log(listaErrores);
        req.flash('error', listaErrores);
        res.redirect('/crear-cuenta');

    }
}