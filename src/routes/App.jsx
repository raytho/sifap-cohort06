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
import ProfileContainer from '../components/Profile/ProfileContainer';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import NewPassword from '../pages/NewPassword';
import TFAuthentication from '../components/TFAutenthication/TFAuthentication';

import Chatbot from '../components/Chatbot/Chatbot';




const App = () => {
   const { isAuth } = useContext(Context);

   return (
      <>
      <Chatbot />
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
                           <Route exact path='/profilecontainer' component={ProfileContainer} />
                           {/* <Route exact path='/delegate-super' component={DelegateSuperContainer} /> */}
                        </Layout>
                        {/* Problema con este redirect, lo hace desde cualquiera ruta */}
                        {/* <Redirect from='/register' to='/' push/> */}
                     </>
                  ) : (
                     <>
                        <Redirect from='/' to='/login' />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/tfauthentication' component={TFAuthentication} />
                        <Route exact path='/resetpassword' component={ResetPassword} />
                        <Route exact path='/newpassword' component={NewPassword} />
                     </>
                  )
            }
         </Switch>
      </BrowserRouter>
      </>
   );
}

export default App;