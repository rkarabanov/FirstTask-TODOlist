import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import * as res from '../actions/LoginAction'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as funcs from '../actions/ForgotPass'

class App extends Component {
    render() {
        const {information, loadingStatus} = this.props;
        const {loginAction,isInSystem, loadComponentAction,backupInformation }=this.props;
        return <LoginForm information={information} loadingStatus={loadingStatus} backupInformation={backupInformation} loadComponentAction={loadComponentAction} loginAction={loginAction}  isInSystem={isInSystem}/>
    }
}

function mapStateToProps (state) {
    return {
        information: state.information,
        loadingStatus: state.loadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {

        backupInformation: bindActionCreators(funcs.backupInformation, dispatch),
        loginAction: bindActionCreators(res.loginAction, dispatch),
        isInSystem:bindActionCreators(res.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)