import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import '../css/main.css'

export default class LoadingPage extends Component {
    testing()
    {
    return 1;
    }

    render(){
        return (
            <div className="centerLoading">
            <h3>Loading</h3>
            <CircularProgress size={80} thickness={7} color="#51BBA7"/>
        </div>
        )
    }
}
