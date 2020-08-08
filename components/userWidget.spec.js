import { mount } from 'enzyme';
import UserWidget from './userWidget';
import firebase from '../lib/firebase';

jest.mock('../lib/firebase', () => ({ auth: jest.fn(() => ({ onAuthStateChanged: jest.fn() })) }));

function setup(props = {}) {
  jest.clearAllMocks();
  return mount(<UserWidget {...props} />);
}

describe('UserWidget Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBeTruthy();
  });

  it('should match snapshot', () => {
    const actual = setup();
    expect(actual.html()).toMatchSnapshot();
  });

  it('should call auth', () => {
    setup();
    expect(firebase.auth).toBeCalledTimes(1);
  });
});
