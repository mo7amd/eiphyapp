import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import Custom404 from '../../pages/404';

jest.mock('../../components/header', () => () => <header>Header</header>);

function setup(props = {}) {
  return mount(<Custom404 {...props} />);
}

describe('Custom404 Tests', () => {
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
