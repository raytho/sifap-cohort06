import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../assets/styles/Global.scss';

import Layout from '../components/Layout';
import Bill from '../components/Bill/Bill';
import History from '../components/History/History';
import Statistics from '../components/Statistics/Statistics';
import Customers from '../components/Customers/Customers';
import RoleManageContainer from '../components/RoleManage/RoleManage/RoleManageContainer';
import ManageCFiscales from '../components/ManageCFiscales/ManageCFiscales';
import DelegateSuperContainer from '../components/DelegateSuper/DelegateSuperContainer';

import RoleDetailContainer from '../components/RoleManage/RoleDetail/RoleDetailContainer';


const App = () => (

   <BrowserRouter>
      <Layout>
         <Switch>
            <Route exact path='/bill' component={Bill} />
            <Route exact path='/history' component={History} />
            <Route exact path='/statistics' component={Statistics} />
            <Route exact path='/customers' component={Customers} />
            <Route exact path='/role-manage' component={RoleManageContainer} />
            <Route exact path='/role-detail/:id' component={RoleDetailContainer} />
            <Route exact path='/c-fiscales' component={ManageCFiscales} />
            <Route exact path='/delegate-super' component={DelegateSuperContainer} />
         </Switch>
      </Layout>
   </BrowserRouter>
);

export default App;