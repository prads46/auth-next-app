import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect('mongodb+srv://pradeep46:5GTE9AHxn2EtTsxh@cluster0.so6ef.mongodb.net/');
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}