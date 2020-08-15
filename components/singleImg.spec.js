import { mount } from 'enzyme';
import SingleImg from './singleImg';

function setup(props = {}) {
  return mount(<SingleImg img={{ img: { url: 'https://via.placeholder.com/150' } }} {...props} />);
}

describe('SingleImg Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBeTruthy();
  });

  it('should match snapshot', () => {
    const actual = setup();
    expect(actual.html()).toMatchSnapshot();
  });
});
