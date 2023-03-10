import {
  Schema,
  model,
  Document,
  Model,
} from 'mongoose';

export interface IUser extends Document {
  id: string;
  phone: string;
}

const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
  phone: { type: String, required: true },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
