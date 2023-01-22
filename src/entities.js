const {Model, DataTypes} = require("sequelize");

class Patient extends Model {}

class Conclusion extends Model {}

const initAll = (sequelize) => {
    Patient.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        middleName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        residence: { type: DataTypes.STRING, allowNull: false },
        dateOfBirth: { type: DataTypes.STRING, allowNull: false },
        sex: { type: DataTypes.ENUM('male', 'female'), allowNull: false },
    }, {
        sequelize,
        modelName: 'patient',
        tableName: 'patients'
    });

    Conclusion.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        data: { type: DataTypes.STRING, allowNull: false },
        patientID: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'conclusion',
        tableName: 'conclusions'
    })
}

module.exports = {Patient, Conclusion, initAll}

