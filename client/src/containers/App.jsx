import React from 'react';
import Header from '../components/Header';
import 'react-table/react-table.css'
import '../styles/app.css';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="content">
      {children}
    </div>
  </div>
);

export default App;
