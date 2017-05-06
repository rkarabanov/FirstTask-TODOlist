import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as exit from '../../actions/ExitUserAction'

import { BrowserRouter, Route, Link } from 'react-router-dom'
import {RaisedButton} from 'material-ui'



export default class ExitBtn extends Component {

    exitUser(){
        this.props.exitUser();
        BrowserRouter.push("/login");
    }

    render() {
        return <RaisedButton label="Выйти" secondary={true} onClick={this.exitUser.bind(this)}/>
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
