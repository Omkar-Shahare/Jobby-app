import { Routes,Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import Jobs from './components/jobs';
import NotFound from './components/notFound';
import ProtectedRoute from './components/protectedRoute';
import JobsItemDetails from './components/jobsItemDetails';
import { Component, useState } from 'react';
// import './App.css'

const App = ()=> {
  return (
    <Routes>
            <Route path="/" element={<ProtectedRoute Component = {Home}/>}></Route>

            <Route path="/login" element={<Login/>}></Route>

            <Route path="/jobs" element={<ProtectedRoute Component = {Jobs}/>}></Route>

            <Route path="/jobs/:id" element={<ProtectedRoute Component = {JobsItemDetails}/>}></Route>

            <Route path="/*" element={<NotFound/>}></Route>


    </Routes>
  )
}

export default App
