import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import RouteWrapper from "./route-wrapper";

export default function NonPrivateRoute ({component: Component, isLogged, ...rest}) {
  console.log("props",rest);
    return (
      <Route
        {...rest}
        render={(props) => isLogged === true
          ? <Redirect to={{pathname: '/home', state: {from: props.location}}} />
          : <RouteWrapper name={rest.name} {...props} >{Component}</RouteWrapper>}
      />
    )
  }