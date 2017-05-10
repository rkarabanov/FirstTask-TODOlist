import React, {Component} from 'react'

import { BrowserRouter } from 'react-router-dom'
import {RaisedButton} from 'material-ui'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as exit from '../../actions/ExitUserAction'


 class ExitBtn extends Component {
     constructor(props) {
         super(props);
     }

    exitUser(){
        this.props.exitUser();
        BrowserRouter.push("/login");
    }

    render() {
        return  <RaisedButton label="Выйти" secondary={true} onClick={this.exitUser.bind(this)}/>;
    }

}

function mapStateToProps() {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        exitUser: bindActionCreators(exit.exitUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExitBtn)