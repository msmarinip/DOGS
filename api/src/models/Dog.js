const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    weightMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weightMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.weightMin} - ${this.weightMax} Kg`;
      }
    },
    heightMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heightMax: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.heightMin} - ${this.heightMax} cm`;
      }
    },
    life_spanMin: {
      type: DataTypes.INTEGER
    },
    life_spanMax: {
      type: DataTypes.INTEGER
    },
    life_span: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.life_spanMin} - ${this.life_spanMax} years old`;
      }
    }
  }, { timestamps: false });
};


/*

[
  {
    "weight": {
      "imperial": "40 - 65",
      "metric": "18 - 29"
    },
    "height": {
      "imperial": "21 - 23",
      "metric": "53 - 58"
    },
    "id": 4,
    "name": "Airedale Terrier",
    "bred_for": "Badger, otter hunting",
    "breed_group": "Terrier",
    "life_span": "10 - 13 years",
    "temperament": "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
    "origin": "United Kingdom, England",
    "reference_image_id": "1-7cgoZSh",
    "image": {
      "id": "1-7cgoZSh",
      "width": 645,
      "height": 430,
      "url": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg"
    }
  }
]



*/