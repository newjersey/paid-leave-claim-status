import { getSessionData, addToSessionData, encodeDecode } from './utils';

describe('Utility Functions', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('encodeDecode function should encode and decode data symmetrically', () => {
    const data = "test data";
    const key = 12345;
    const encodedData = encodeDecode(data, key);
    expect(encodedData).toBe("きぜおき〙そじきじ"); // yes it really does encode into any character
    const decodedData = encodeDecode(encodedData, key);
    expect(decodedData).toBe(data);
  });

  test('getSessionData should return empty object if no data in session storage', () => {
    expect(getSessionData()).toEqual({});
  });

  test('addToSessionData should merge new data with existing data', () => {
    const existingData = { user: 'existingUser' };
    const newData = { email: 'test@example.com' };

    addToSessionData(existingData);
    addToSessionData(newData);

    const sessionData = getSessionData();
    expect(sessionData).toEqual({ user: 'existingUser', email: 'test@example.com' });
  });
});
