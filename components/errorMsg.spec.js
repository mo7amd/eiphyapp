import { mount } from 'enzyme';
import ErrorMsg from './errorMsg';

function setup(props = {}) {
  return mount(<ErrorMsg msg="this is an error" {...props} />);
}

describe('ErrorMsg Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBe(actual);
  });

  it('should match snapshot', () => {
    const actual = setup();
    expect(actual.html()).toMatchSnapshot();
  });

  it('should return falsy with no message', () => {
    const actual = setup({ msg: '' });
    expect(actual.html()).toBeFalsy();
  });
});
