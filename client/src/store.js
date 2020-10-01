import React from 'react';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers';
import createEncryptor from 'redux-persist-transform-encrypt'
import storageSession from 'redux-persist/lib/storage/session'

const encryptor = createEncryptor({
  secretKey: 'd5937005edde009064f2218548c37353',
  onError: function(error) {
    // Handle the error.
  }
})

const persistConfig = {
  key: 'root',
  storage: storageSession,
  transforms: [encryptor]
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, composeEnhancers(middleware));
const persistor = persistStore(store);


export { persistor, store };