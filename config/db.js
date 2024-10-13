const mongoose = require('mongoose');
const colors = require('colors')

 const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_LOCAL)
        console.log(`Conected to the database ${mongoose.connection.host} `.bgCyan)
    } catch (error) {
        console.log('DB Error', error, colors.bgRed)
    }
}

module.exports = connectDb;

