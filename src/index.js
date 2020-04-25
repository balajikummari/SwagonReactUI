import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import PageControl from './Pages/PageControl'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <BrowserRouter>
    <PageControl/> 
    </BrowserRouter>
, document.getElementById('root'));


