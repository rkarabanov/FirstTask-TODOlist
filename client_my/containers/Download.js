import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import * as reg from '../actions/RegAction'
import * as download from '../actions/DownloadFileAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import {browserHistory} from 'react-router'
import {RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import * as funcs from '../actions/ForgotPass'
import DownloadLink from 'react-download-link'
import '../css/main.css'

class Registration extends Component {

    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.downloadExcel();
    }

    link(){
if(this.props.file!=undefined)
    return <a href={this.props.file}>Here</a>

        else return "";
    }


    render() {
        // const { user } = this.state;


        return <div>Download
            {this.link()}
        </div>

    }
    componentWillUnmount() {
        // this.props.backupInformation();
        // this.props.loadComponentAction();
    }
}



function mapStateToProps (state) {
    return {
        file:state.file
    }
}

function mapDispatchToProps(dispatch) {
    return {
        downloadExcel: bindActionCreators(download.downloadExcel, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Registration)