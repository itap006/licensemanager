import Main from 'Main';
import Login from 'pages/Login';
import ProtectedRoute from 'pages/ProtectedRoute';
import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import { queryClient, setup } from 'Utils/util';

function App() {
  useEffect(() => {
    setup();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Switch>
          <Route component={Login} path="/login" />
          <ProtectedRoute component={Main} path="/" />
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;
