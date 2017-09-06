import React from "react";
import {render} from 'react-dom';
import MobileQuery from 'react-responsive'

import {Router , Route , hashHistory , IndexRoute} from 'react-router';

import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
import NewsLists from './components/news_list'

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={NewsContainer}/>
            <Route path="/newsList/:type/:count/:title\" component={NewsLists}/>
            <Route path="/detail/:uniqueKey" component={NewsDetail} />
            <Route path="/userCenter" component={UserCenter} />
        </Route>
    </Router>
) , document.getElementById("root"));

