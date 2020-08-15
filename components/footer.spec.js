import { mount } from 'enzyme';
import Footer from './footer';

function setup(props = {}) {
  return mount(<Footer {...props} />);
}

describe('Footer Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBeTruthy();
  });

  it('should match snapshot', () => {
    const actual = setup();
    expect(actual.html()).toMatchSnapshot();
  });
});
