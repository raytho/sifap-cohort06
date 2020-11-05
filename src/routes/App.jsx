import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Context } from '../Context';

import '../assets/styles/Global.scss';

import Layout from '../components/Layout';
import BillContainer from '../components/Bill/BillContainer';
import History from '../components/History/History';
import Statistics from '../components/Statistics/Statistics';
import RoleManageContainer from '../components/RoleManage/RoleManage/RoleManageContainer';
import ManageCFiscales from '../components/ManageCFiscales/ManageCFiscales';
import RoleDetailContainer from '../components/RoleManage/RoleDetail/RoleDetailContainer';
import ProfileContainer from '../components/Profile/ProfileContainer';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import NewPassword from '../pages/NewPassword';
import TFAuthentication from '../components/TFAutenthication/TFAuthentication';
import InitialConfigContainer from '../components/InitialConfig/InitialConfigContainer';
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
                           <Route exact path='/emitirfacturas' component={BillContainer} />
                           <Route exact path='/historial' component={History} />
                           <Route exact path='/estadisticas' component={Statistics} />
                           <Route exact path='/roles' component={RoleManageContainer} />
                           <Route exact path='/role-detail/:id' component={RoleDetailContainer} />
                           <Route exact path='/cfiscales' component={ManageCFiscales} />
                           <Route exact path='/profile' component={ProfileContainer} />
                           <Route exact path='/cpaises' component={InitialConfigContainer} />
                        </Layout>
                     </>
                  ) : (
                     <>
                     {/* Este va con '/login', así '/ 'es mientra tantos */}
                        <Route exact path='/' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/resetpassword' component={ResetPassword} />
                        <Route exact path='/newpassword/:id' component={NewPassword} />
                        <Route exact path='/tfauthentication' component={TFAuthentication} />
                        {/* {
                           TFA
                           && <Route exact path='/tfauthentication' component={TFAuthentication} />
                        } */}
                     </>
                  )
            }
         </Switch>
      </BrowserRouter>
      </>
   );
}

export default App;