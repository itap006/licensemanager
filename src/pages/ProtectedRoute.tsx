import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute: React.FC<
  RouteProps & {
    component: any;
    authenticated: any;
    name?: string;
  }
> = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { referrer: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapState = (state: any) => {
  return { authenticated: state.authenticated };
};

export default connect(mapState)(ProtectedRoute);
