import React from "react"
import PropTypes from "prop-types"

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import {store, persistor} from '../store';

import Home from '../screens/home';
import { PersistGate } from "redux-persist/integration/react";

import { ActionCableProvider } from 'use-action-cable';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ActionCableProvider url="/cable">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" render={() => <Home />} />
              </Switch>
            </BrowserRouter>
          </ActionCableProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App
