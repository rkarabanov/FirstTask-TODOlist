import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as exit from '../actions/ExitUserAction'

import {browserHistory} from 'react-router'
import {RaisedButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



export default class ExitBtn extends Component {

    exitUser(){
        this.props.exitUser();
        browserHistory.push("/login");
    }

    render() {
        return <MuiThemeProvider><RaisedButton label="Выйти" secondary='true' onClick={this.exitUser.bind(this)}/></MuiThemeProvider>
    }

}


function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        exitUser: bindActionCreators(exit.exitUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExitBtn)
