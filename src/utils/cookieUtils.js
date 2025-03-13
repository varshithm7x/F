export const secureCookieOptions = {
  secure: true,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
};

export const clearAuthCookies = () => {
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('__clerk')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict`;
    }
  });
}; 