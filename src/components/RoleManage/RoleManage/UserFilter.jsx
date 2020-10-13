/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes, { shape } from 'prop-types';

import UserItem from './UserItem';

const UserFilter = ({ filteredName, resultUno, resultDos}) => {
   return (
      <>
      {
         filteredName
         ? <UserItem data={resultUno}/>
         : <UserItem data={resultDos}/>
      }
      </>
   );
}

UserFilter.propTypes = {
   filteredName: PropTypes.bool.isRequired,
   resultUno: PropTypes.arrayOf(shape()).isRequired,
   resultDos: PropTypes.arrayOf(shape()).isRequired
}

export default UserFilter;