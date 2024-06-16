import { useState } from 'react'
import './App.scss';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { publicRoutes } from './routes';
import { DefaultLayout } from './layouts';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <ScrollToTop/>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout
              const Page = route.component
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              } />
            })}
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App 
