import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarAPI from "../../src/api/calendarAPI";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { initialState, notAuthenticatedState, authenticatedState } from "../_fixtures/authStates";
import { testUserCredentials } from "../_fixtures/testUser";

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    }
  });
};

describe('Test on useUiStore', () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('Should return default values', () => {

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });

  });

  test('startLogin should log a user', async () => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn(calendarAPI, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: 'abc123',
        name: 'Peter Parker'
      }
    });

    act(() => {
      result.current.startLogin( testUserCredentials );
    });

    expect( result.current.status ).toBe('checking');

    await act( async () => {
      await result.current.startLogin( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: {
        uid: 'abc123',
        name: 'Peter Parker',
      },
    });

    expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
    expect( localStorage.getItem('token-init-date') ).toEqual(expect.any(String));

    spy.mockRestore();

  });

  test('startLogin should fail with wrong credentials', async () => {

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPI, 'post' ).mockRejectedValue({
      response: {
        data: {
          ok: false,
          msg: "El usuario no existe",
        }
      }
    });

    act(() => {
      result.current.startLogin( testUserCredentials );
    });

    expect( result.current.status ).toBe('checking');

    await act( async () => {
      await result.current.startLogin({
        email: 'wrong@gmail.com',
        password: 'wrong-password'
      });
    });

    expect( localStorage.getItem('token') ).toBe( null );
    expect( localStorage.getItem('token-init-date') ).toBe( null );

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'El usuario no existe',
      status: 'not-authenticated',
      user: {}
    });

    await waitFor(() => {
      expect( result.current.errorMessage ).toBe( undefined );
    });

    spy.mockRestore();

  });

  test('startRegister should create and log the user', async () => {

    const newUser = {
      name: 'Steve Johnson',
      email: 'steve@somedomain.com',
      password: 'secretpassword'
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPI, 'post' ).mockReturnValue({
      data: {
        ok: true,
        uid: 'abc123',
        name: 'Steve Johnson',
        token: 'some-mocked-token'
      }
    });

    act(() => {
      result.current.startLogin( testUserCredentials );
    });

    expect( result.current.status ).toBe('checking');

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      errorMessage: undefined,
      user: {
        uid: 'abc123',
        name: 'Steve Johnson',
      }
    });

    expect( localStorage.getItem('token') ).toBe( 'some-mocked-token' );
    expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    spy.mockRestore();

  });

  test('startRegister should fail user creation', async () => {

    const newUser = {
      name: 'Peter Parker',
      email: 'spiderman@marvel.com',
      password: '0123456789'
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPI, 'post' ).mockRejectedValue({
      response: {
        data: {
          ok: false,
          msg: 'El email "spiderman@marvel.com" ya está registrado',
        }
      }
    });

    act(() => {
      result.current.startLogin( testUserCredentials );
    });

    expect( result.current.status ).toBe('checking');

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: "not-authenticated",
      errorMessage: "El email \"spiderman@marvel.com\" ya está registrado",
      user: {},
    });

    expect( localStorage.getItem('token') ).toBe( null );
    expect( localStorage.getItem('token-init-date') ).toBe( null );

    spy.mockRestore();

  });

  test('checkAuthToken should fail if token was not provided', async () => {

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect( localStorage.getItem('token') ).toBe( null );
    expect( localStorage.getItem('token-init-date') ).toBe( null );

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      errorMessage: undefined,
      user: {},
    });

  });

  test('checkAuthToken should authenticate user if token was provided', async () => {

    const mockStore = getMockStore({ ...initialState });
    const mockToken = 'some-mocked-token';
    const mockUser = { uid: '86423157', name: 'Peter Parker' };

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPI, 'get' ).mockReturnValue({
      data: {
        ok: true,
        uid: mockUser.uid,
        name: mockUser.name,
        token: mockToken
      }
    });

    localStorage.setItem('token', mockToken);

    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      errorMessage: undefined,
      user: mockUser,
    });

    expect( localStorage.getItem('token') ).toBe( mockToken );
    expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    spy.mockRestore();

  });

  test('checkAuthToken should reject with invalid token', async () => {

    const mockStore = getMockStore({ ...initialState });
    const mockToken = 'expired-invalid-token';

    localStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const spy = jest.spyOn( calendarAPI, 'get' ).mockRejectedValue({
      response: {
        data: {
          ok: false,
          msg: 'Token no válido'
        }
      }
    });

    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      errorMessage: 'Token no válido',
      user: {},
    });

    expect( localStorage.getItem('token') ).toBe( null );
    expect( localStorage.getItem('token-init-date') ).toBe( null );

    spy.mockRestore();

  });

  test('startLogout should logout out an authenticated user', async () => {

    const mockStore = getMockStore({ ...authenticatedState });
    const mockToken = 'valid-token';
    const mockInitDate = new Date('2022-03-15 12:00:00').getTime();

    localStorage.setItem('token', mockToken);
    localStorage.setItem('token-init-date', mockInitDate);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(() => {
      result.current.startLogout();
    });

    const { errorMessage, status, user } = result.current;

    expect( localStorage.getItem('token') ).toBe( null );
    expect( localStorage.getItem('token-init-date') ).toBe( null );

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      errorMessage: undefined,
      user: {},
    });

  });
});
