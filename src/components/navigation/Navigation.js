import React from 'react';
import '../../App.css';

const Navigation = () => {
  return (
    <nav style = {{display : 'flex', justifyContent : 'flex-end', position : 'absolute', right : 0}}>
      <span className = 'fw600 f3 link dim black underline ma4 pointer'>Sign out</span>
    </nav>
  );
}

export default Navigation;