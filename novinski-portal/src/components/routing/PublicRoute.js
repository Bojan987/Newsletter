import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../../context/AppContext';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const token = localStorage.getItem('token')
    const context = useContext(AppContext);
    context.token = token
   
    
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            token && restricted ?
                <Redirect to="/login" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;