import React, { useEffect } from 'react';
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './components/notfound/NotFound';
import Homepage from './components/home/Homepage';
import SearchResults from './components/searchresults/SearchResults';
import Roompage from './components/room/Roompage';
import FAQs from './components/faq/FAQs';
import Shop from './components/shop/Shop';
import Browse from './components/browse/Browse';
import Admin from './components/admin/Admin';
import Aboutus from './components/aboutus/Aboutus';
import TOS from './components/common/tos';



function App() {
    useEffect(() => {
        document.title = "gat.or"
        
     }, []);
    return (
        <main>
            <style>{'body { background-color: #f8f8ff; }'}</style>
            <Switch>
                <Route path='/' component={Homepage} exact />
                <Route path='/search/:searchTerm1/:searchTerm2' component={SearchResults} />
                <Route path='/room/:roomId' component={Roompage} />
                <Route path='/room' component={Roompage} />
                <Route path='/browse' component={Browse} />
                <Route path='/admin' component={Admin} />
                <Route path='/FAQs' component={FAQs} exact />
                <Route path='/shop' component={Shop} exact />
                <Route path='/aboutus' component={Aboutus} exact />
                <Route path='/tos' component={TOS} exact />
                <Route component={NotFound} />
            </Switch>
        </main>
        
        
    )
}

export default App;
