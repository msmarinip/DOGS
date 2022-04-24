const { DataTypes } = require('sequelize');

const temperament = (sequelize) => {
    sequelize.define('temperament', {
        temperament: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, { 
        timestamps: false
      })
}


module.exports = temperament;