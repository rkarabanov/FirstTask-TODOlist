import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress';

import '../css/main.css'

const LoadingPage = () => (
    <div className="centerLoading">
        <h3>Loading</h3>
       <CircularProgress size={80} thickness={7} color="#51BBA7"/>
    </div>
);
export default LoadingPage;
