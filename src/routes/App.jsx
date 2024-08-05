import { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from 'react-router-dom';
import PostListProvider from '../store/post-list-store';
import "./App.css";


function App() {
  const [selectTab, setSelectTab] = useState("Home");
  return (
    <PostListProvider >
      <div className='app-container'>
        <SideBar selected={selectTab} setTab={setSelectTab}></SideBar>
        <div className='content'>
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  )
}

export default App
