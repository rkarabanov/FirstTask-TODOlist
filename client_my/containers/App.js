import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import * as res from '../actions/LoginAction'
import * as loadCompAction from '../actions/LoadComponentAction'


class App extends Component {
    render() {
        const {msg, loadingStatus} = this.props;
        const {loginAction,isInSystem, loadComponentAction }=this.props;
        return <LoginForm msg={msg} loadingStatus={loadingStatus} loadComponentAction={loadComponentAction} loginAction={loginAction}  isInSystem={isInSystem}/>
    }
}

function mapStateToProps (state) {
    return {
        msg: state.msg,
        loadingStatus: state.loadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: bindActionCreators(res.loginAction, dispatch),
        isInSystem:bindActionCreators(res.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)