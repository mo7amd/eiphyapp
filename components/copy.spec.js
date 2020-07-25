import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Copy from './copy';

function setup() {
  return mount(<Copy link="http://localhost:2020" />);
}

describe('Copy Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBe(actual);
  });

  it('should match snapshot', () => {
    const actual = setup();
    expect(actual.html()).toMatchSnapshot();
  });

  it('click on button', () => {
    document.execCommand = jest.fn();
    const actual = setup();

    act(() => {
      actual.find('button').simulate('click');
    });

    expect(document.execCommand).toBeCalledTimes(1);
    expect(document.execCommand).lastCalledWith('copy');
  });
});
