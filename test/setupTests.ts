// import {WindowWithHeap} from '@globalization-parthers/gp-goglobal-ui/core/Utils/helpers';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { configure } from '@testing-library/react';
// import 'core/Utils/MockServer/node';

// Default call to t() function just returns the key.
// Name must start with `mock` prefix, otherwise jest throws a warning.
// Note: we can do this despite jest automatically hoisting jest.mock() calls to the top because translations
// are always called after this was initialized. (see https://jestjs.io/docs/en/manual-mocks#using-with-es-module-imports)
let mockTranslate: any = (key: string) => key;
// Mock translation utils
jest.mock('react-i18next', () => ({
  Trans: ({ children }: any) => children,
  useTranslation: () => ({ t: mockTranslate }),
}));
jest.mock('i18next', () => ({ t: mockTranslate }));

function useInterpolationTranslateMock() {
  mockTranslate = (key: string, params: any) => {
    return `${key}${params ? JSON.stringify(params) : ''}`;
  };
}
// Mock jsoneditor-react
// jest.mock('jsoneditor-react', () => 'JsonEditor');
const originalWindowLocation = window.location;
function useLocationAssignMock() {
  // Mocks window navigation utils
  const location = {
    ...originalWindowLocation,
    assign: jest.fn(),
  };
  delete window.location;
  window.location = location;
}

const originalConsoleError = console.error.bind(console);

function silenceConsoleError() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {};
}

globalThis.testUtils = {
  useInterpolationTranslateMock,
  useLocationAssignMock,
  silenceConsoleError,
};

// Increase timeouts to reduce flakiness
if (process.env.CI) {
  jest.setTimeout(30000);
  beforeAll(() => {
    // Increase timeouts because github actions are slow
    configure({ asyncUtilTimeout: 8000 });
  });
} else {
  jest.setTimeout(20000);
  beforeAll(() => {
    configure({ asyncUtilTimeout: 6000 });
  });
}

Object.assign(window, {
  heap: {
    identify: jest.fn(),
    addUserProperties: jest.fn(),
  },
});
(window as typeof globalThis) /* & WindowWithHeap*/.heap.identify = jest.fn();

beforeEach(() => {
  window.location = originalWindowLocation;
  // Restore translation mock to default in case testUtils.useInterpolationTranslateMock()
  // was used in previous test, so we don't break tests that rely on default mock
  mockTranslate = (key: string) => key;
  console.error = originalConsoleError;
});
