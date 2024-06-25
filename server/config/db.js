import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
// load enviorment var
dotenv.config();

const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL10);
        console.log(`YOUR DATA BASE CONNECT ${conn.connection.host} `.bgMagenta.white);
    } catch (error) {
        console.log(`ERROR IS DATA BASE CONNECTION ${error} `.bgRed.white);

    }
}

export default ConnectDb;