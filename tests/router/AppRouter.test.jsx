import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe('Test on AppRouter', () => {
  const mockCheckAuthToken = jest.fn()

  beforeEach( () => jest.clearAllMocks() );

  test('Should show with default values', () => {

    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    });

    const { container } = render( <AppRouter /> );

    const spinner = container.querySelector('#spinner');

    expect( spinner.innerHTML ).toContain('Loading');
    expect( mockCheckAuthToken ).toHaveBeenCalled();

  });

  test('Should render to login page if user is not authenticated', () => {

    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    const { container, getByRole } = render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(getByRole('heading', { name: 'Login' })).toBeTruthy();
    expect(getByRole('heading', { name: 'Register' })).toBeTruthy();
    expect( container ).toMatchSnapshot();

  });

  test('Should render calendar page if user is authenticated', () => {

    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken
    });

    const { getByRole } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    const h1 = getByRole('heading', { level: 1 })

    expect( mockCheckAuthToken ).toHaveBeenCalled();
    expect(h1.innerHTML).toBe('Calendar Page');

  });
});
