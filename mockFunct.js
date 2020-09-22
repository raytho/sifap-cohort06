import iconBill from './src/assets/static/icon/bill-white.png';
import iconHistory from './src/assets/static/icon/history-white.png';
import iconStats from './src/assets/static/icon/stats-white.png';
import iconCustomer from './src/assets/static/icon/customer-white.png';
import iconRole from './src/assets/static/icon/manage-rol-white.png';
import iconCf from './src/assets/static/icon/manage-cf-white.png';
import iconDelegar from './src/assets/static/icon/delegate-white.png';

const funcMock = {
   functionalitys: [
      {
         id: 1,
         type: 'Emitir Facturas',
         icon: iconBill,
         path: '/bill',

      },
      {
         id: 2,
         type: 'Historial',
         icon: iconHistory,
         path: '/history',

      },
      {
         id: 3,
         type: 'Estadísticas',
         icon: iconStats,
         path: '/statistics',

      },
      {
         id: 4,
         type: 'Clientes',
         icon: iconCustomer,
         path: '/customers',

      },
      {
         id: 5,
         type: 'Roles',
         icon: iconRole,
         path: '/role-manage',

      },
      {
         id: 6,
         type: 'C. Fiscales',
         icon: iconCf,
         path: '/c-fiscales',

      },
      {
         id: 7,
         type: 'Delegar S. Admin',
         icon: iconDelegar,
         path: '/delegate-super',

      },

   ],
};

export default funcMock;