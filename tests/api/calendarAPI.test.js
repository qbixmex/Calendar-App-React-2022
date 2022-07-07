import calendarAPI from "../../src/api/calendarAPI";

describe('Tests on calendarApi', () => {
  test('Should have default setup', () => {
    expect( calendarAPI.defaults.baseURL ).toBe( process.env.VITE_API_URL );
  });

  test('Should have x-token to header for all requests', async () => {
    const token = 'ABC-123';
    localStorage.setItem( 'token', token );
    const response = await calendarAPI('/auth');
    expect( response.config.headers['x-token'] ).toBe( token );
  });
})
