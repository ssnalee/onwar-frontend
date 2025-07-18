export function isTokenValid(token) {
    if(!token) return false;
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime < payload.exp;
    } catch (e) {
      console.error('Invalid token', e);
      return false;
    }
  }