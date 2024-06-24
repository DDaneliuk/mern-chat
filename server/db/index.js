import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DB!')
  } catch (e) {
    console.log('Error while trying to connect to db', e)
  }
}

export default connectMongo;