import {
  Schema,
  model,
  Document,
  Model,
} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
