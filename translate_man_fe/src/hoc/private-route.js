import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import RouteWrapper from "./route-wrapper";

export default function PrivateRoute ({component: Component, isLogged, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => isLogged === true
          ? <RouteWrapper name={rest.name} {...props} >{Component}</RouteWrapper>
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }