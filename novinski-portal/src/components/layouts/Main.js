import React from 'react'
import { Route, Switch } from 'react-router-dom'

import About from '../pages/About'
import Contact from '../../pages/Contact/Contact'
import Home from '../pages/Home'
import Category from '../../pages/Category'
import SinglePost from '../../pages/SinglePost/SinglePost'
import SearchPage from '../../pages/SearchPage/SearchPage'
import PublicProfile from '../../pages/PublicProfile/PublicProfile'
import MyProfile from '../../pages/MyProfile/MyProfile'
import MySettings from '../../pages/MySetting/MySettings'
import ErrorPage from '../../pages/ErrorPage'
import PrivateRoute from '../routing/PrivateRoute'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import ForgotPassword from '../../pages/Login/ForgotPassword'
import ResetCode from '../../pages/Login/ResetCode'
import ResetPassword from '../../pages/Login/ResetPassword'

import './Main.css'

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/forgot-password-otp/:email" component={ResetCode} />
                <Route path="/reset-password/:email/:code" component={ResetPassword} />
                <Route path="/category/:name/:id" component={Category} />
                <Route path="/search-page" component={SearchPage} />
                <Route path="/single-post/:id" component={SinglePost} />
                <Route path="/public-profile/:id" component={PublicProfile} />
                
                <PrivateRoute exact path="/my-profile" component={MyProfile} />
                <PrivateRoute exact path="/settings" component={MySettings} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </main>
    )
}

export default Main
