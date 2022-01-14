import mongoose from 'mongoose';

const Connection = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;