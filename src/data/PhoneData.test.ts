import PhoneData from './PhoneData';

describe('PhoneData', () => {
  it('validate an invalid number with wrong length', () => {
    const isValid = new PhoneData('11').validate();
    const isValid2 = new PhoneData('119999999999').validate();

    expect(isValid).toBe(false);
    expect(isValid2).toBe(false);
  });

  it('validate a valid number', () => {
    const isValid = new PhoneData('11999999999').validate();

    expect(isValid).toBe(true);
  });

  it('check for the 9 digit', () => {
    const isValid = new PhoneData('11999999999').validate();
    const notValid = new PhoneData('11899999999').validate();

    expect(isValid).toBe(true);
    expect(notValid).toBe(false);
  });

  it('only numbers allowed', () => {
    const notValid = new PhoneData('1199h999999').validate();
    const notValid2 = new PhoneData('h1189999999').validate();
    const notValid3 = new PhoneData('h118999999h').validate();

    expect(notValid).toBe(false);
    expect(notValid2).toBe(false);
    expect(notValid3).toBe(false);
  });
});
