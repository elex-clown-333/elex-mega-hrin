const {Sequelize, DataTypes, Model} = require("sequelize");
const express = require('express');
const {initAll} = require("./entities");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'gimno.db'
});

const app = express();

app.use(express.json());

app.use('/patients', require('./routes').patients);
app.use('/conclusions', require('./routes').conclusions);

async function start() {
    await sequelize.sync({ force: true });
}

app.listen(6969,() => {
    console.log(`Example app listening on port 6969`)
    initAll(sequelize)
})

start()

module.exports = {sequelize, start}
