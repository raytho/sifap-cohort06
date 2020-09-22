import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../assets/styles/Global.scss';

import Layout from '../components/Layout';
import Bill from '../components/Bill';
import History from '../components/History';
import Statistics from '../components/Statistics';
import Customers from '../components/Customers';
import RoleManage from '../components/RoleManage';
import ManageCFiscales from '../components/ManageCFiscales';
import DelegateSuper from '../components/DelegateSuper';

const App = () => (

   <BrowserRouter>
      <Layout>
         <Switch>
            <Route exact path='/bill' component={Bill} />
            <Route exact path='/history' component={History} />
            <Route exact path='/statistics' component={Statistics} />
            <Route exact path='/customers' component={Customers} />
            <Route exact path='/role-manage' component={RoleManage} />
            <Route exact path='/c-fiscales' component={ManageCFiscales} />
            <Route exact path='/delegate-super' component={DelegateSuper} />
         </Switch>
      </Layout>
   </BrowserRouter>
);

export default App;