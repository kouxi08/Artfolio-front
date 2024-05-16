import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Sendimg from './Sendimg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Portfolio from './Portfolio';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routesBasic = createBrowserRouter([
  { path: '/' ,element:<Sendimg/>},
  { path: '/portfolio' ,element: <Portfolio/>}
])
root.render(
  <RouterProvider router={routesBasic} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
