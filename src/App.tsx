import Main from 'Main';
import Login from 'pages/Login';
import ProtectedRoute from 'pages/ProtectedRoute';
import { QueryClientProvider } from 'react-query';
import { Switch, Route } from 'react-router-dom';
import { queryClient, setup } from 'Utils/util';

setup();

function App() {
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
