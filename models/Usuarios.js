const Sequelize = require('sequelize');
const db = require('../config/db');
const bcryp = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(60),
    imagen: Sequelize.STRING(60),
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: { msg: 'Agrega un email válido' }
        },
        unique: {
            args: true,
            msg: 'usuario ya registrado'
        },
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña es obligatoria'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tokenPassword: Sequelize.STRING,
    expiraToken: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcryp.hashSync(usuario.password, bcryp.genSaltSync(10), null);
        }
    }
});

// Método para comparar passwords
Usuarios.prototype.validarPassword = function(password) {
    return bcryp.compareSync(password, this.password);
}

module.exports = Usuarios;