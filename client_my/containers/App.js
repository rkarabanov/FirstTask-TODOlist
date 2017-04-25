import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import * as loginAction from '../actions/LoginAction'

class App extends Component {
    render() {
        const { msg, userInSystem } = this.props;
        const {loginAction }=this.props.loginAction;
        return <LoginForm msg={msg} loginAction={loginAction}/>
    }
}

function mapStateToProps (state) {
    return {
        msg: state.msg,
        userInSystem:state.userInSystem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: bindActionCreators(loginAction, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)