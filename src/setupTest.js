import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { initializeMockApp } from '@edx/frontend-platform/testing';

// Initialize the mock application services (logging, auth, config) so that
// components dispatching thunks that rely on them (e.g. logError) work in tests.
beforeEach(() => {
  initializeMockApp();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(q => ({
    matches: false,
    media: q,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}
window.ResizeObserver = ResizeObserver;
