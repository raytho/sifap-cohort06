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
// import DelegateSuperContainer from '../components/DelegateSuper/DelegateSuperContainer';
import RoleDetailContainer from '../components/RoleManage/RoleDetail/RoleDetailContainer';
import Profile from '../components/Profile/Profile';
import Register from '../pages/Register';
import Login from '../pages/Login';
import TFAutenthication from '../components/TFAutenthication/TFAutenthication';




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
                           {/* <Route exact path='/delegate-super' component={DelegateSuperContainer} /> */}
                        </Layout>
                        <Route exact path='/profile' component={Profile} />
                        {/* Problema con este redirect, lo hace desde cualquiera ruta */}
                        {/* <Redirect from='/register' to='/' push/> */}
                     </>
                  ) : (
                     <>
                        <Redirect from='/' to='/login' />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/tfautenthication' component={TFAutenthication} />
                     </>
                  )
            }
         </Switch>
      </BrowserRouter>
   );
}

export default App;