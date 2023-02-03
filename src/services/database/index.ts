import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export const startup = async () => {
  const uri = process.env.DB_CONN_STRING || '';

  await mongoose.connect(uri);

  console.log('Connectd to service: Database');
};

export const shutdown = () => {
  mongoose.connection.close();
  console.log('Closed service: Database');
};
