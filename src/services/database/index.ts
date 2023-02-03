import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const startup = async () => {
  await mongoose.connect(process.env.DB_CONN_STRING);

  console.log('Connectd to service: Database');
};

export const shutdown = () => {
  mongoose.connection.close();
  console.log('Closed service: Database');
};
