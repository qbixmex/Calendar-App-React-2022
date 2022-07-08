import { authSlice, onLogin, onLogout, onClearMessage, onChecking } from "../../../src/store/auth/authSlice";
import { initialState, authenticatedState, notAuthenticatedState } from "../../_fixtures/authStates";
import { testUserCredentials } from "../../_fixtures/testUser";

describe('Test on AuthSlice', () => {
  test('Should back to initial state named "auth"', () => {
    expect( authSlice.name ).toBe( 'auth' );
    expect( authSlice.getInitialState() ).toEqual( initialState );
  });
  test('Should Login User', () => {
    const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
    expect( state ).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined
    });
  });
  test('Should Logout User', () => {
    const state = authSlice.reducer( authenticatedState, onLogout() );
    expect( state ).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined
    });
  });
  test('Should Logout User with error message', () => {
    const testErrorMessage = 'Bad Credentials';
    const state = authSlice.reducer( authenticatedState, onLogout( testErrorMessage ) );
    expect( state ).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: testErrorMessage
    });
  });
  test('Should clear error message', () => {
    const testErrorMessage = 'Bad Credentials';
    const logoutState = authSlice.reducer( authenticatedState, onLogout( testErrorMessage ) );
    const clearState = authSlice.reducer( logoutState, onClearMessage() );
    expect( clearState.errorMessage ).toBe( undefined );
  });
  test('Should check credentials', () => {
    const checkingState = authSlice.reducer( authenticatedState, onChecking() );
    expect( checkingState.status ).toBe( 'checking' );
  });
});
