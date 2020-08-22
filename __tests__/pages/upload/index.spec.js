import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import Upload from '../../../pages/upload/index';

jest.mock('../../../components/header', () => () => <header>Header</header>);

function setup(props = {}) {
  return mount(<Upload {...props} />);
}

describe('Upload Tests', () => {
  it('should work', () => {
    const actual = setup();
    expect(actual).toBe(actual);
  });

  it('should match snapshot', async () => {
    const actual = setup();
    const html = actual.html();
    expect(html).toMatchSnapshot();
    expect(await axe(html)).toHaveNoViolations();
  });
});
