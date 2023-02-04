import {
  Schema,
  model,
  Document,
  Model,
} from 'mongoose';

export interface IAuth extends Document {
  id: string;
  phone: string;
  code: string;
}

const authSchema = new Schema<IAuth>({
  id: { type: String, required: true },
  phone: { type: String, required: true },
  code: { type: String },
});

const User: Model<IAuth> = model<IAuth>('Auth', authSchema);

export default User;
