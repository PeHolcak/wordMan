import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import RouteWrapper from "./route-wrapper";

function PublicRoute(props) {
    const childProps = {...props};
    delete childProps['path'];
    delete childProps['exact'];
    delete childProps['component'];
    console.log("props",props);
    return (
        <Route
        path={props.path}
        exact={props.exact}
        render={()=><RouteWrapper name={props.name}>{props.component}</RouteWrapper>} />
    )
}

export default PublicRoute;
