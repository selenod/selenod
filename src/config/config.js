export const landingURL = process.env.REACT_APP_BUILD
  ? 'https://selenod.com'
  : 'http://localhost:3001';
export const appURL = process.env.REACT_APP_BUILD
  ? 'https://app.selenod.com'
  : 'http://localhost:3003';
export const serverURL = process.env.REACT_APP_BUILD
  ? 'https://api.selenod.com'
  : 'http://localhost:80';
