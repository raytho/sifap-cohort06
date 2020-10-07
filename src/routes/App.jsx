import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Context } from '../Context';

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
import Register from '../pages/Register';
import Login from '../pages/Login';




const App = () => {
   const { isAuth } = useContext(Context);

   return (

      <BrowserRouter>
         <Switch>

            {
               isAuth
                  ? (
                     <>
                        <Layout>
                           <Route exact path='/bill' component={Bill} />
                           <Route exact path='/history' component={History} />
                           <Route exact path='/statistics' component={Statistics} />
                           <Route exact path='/customers' component={Customers} />
                           <Route exact path='/role-manage' component={RoleManageContainer} />
                           <Route exact path='/role-detail/:id' component={RoleDetailContainer} />
                           <Route exact path='/c-fiscales' component={ManageCFiscales} />
                           <Route exact path='/delegate-super' component={DelegateSuperContainer} />
                        </Layout>
                        <Redirect from='/register' to='/' />
                     </>
                  ) : (
                     <>
                        <Redirect from='/' to='/register' />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                     </>
                  )
            }
         </Switch>
      </BrowserRouter>
   );
}

export default App;