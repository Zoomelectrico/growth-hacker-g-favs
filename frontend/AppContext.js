import React from 'react';

export default React.createContext({
  sources: [],
  user: {},
  currentSource: {},
  token: '',
  setSources: () => {},
  setUser: () => {},
  setCurrentSource: () => {},
  setToken: () => {},
});
