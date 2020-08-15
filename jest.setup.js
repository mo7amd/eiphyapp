import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// use TEST_PORT for jest to be able to run tests while doing dev
process.env.PORT = process.env.TEST_PORT || process.env.PORT;

configure({ adapter: new Adapter() });
