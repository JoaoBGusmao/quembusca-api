import { IData } from './IData';

class PhoneData implements IData<string> {
  data;

  constructor(readonly phone: string) {
    this.data = phone;
  }

  validate = () => (
    this.data.length === 11
    && this.data[2] === '9'
    && /^[0-9]*$/.test(this.data)
  );

  get = () => this.data;
}

export default PhoneData;
