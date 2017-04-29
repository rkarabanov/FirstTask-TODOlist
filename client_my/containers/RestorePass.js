import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as funcs from '../actions/RestorePass'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import {browserHistory} from 'react-router'
import {RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../css/main.css'

export default class RestorePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.query.id
        };
    }
    restore(e) {
        this.props.restorePass(this.props.location.query.id, {"pass": "" + document.getElementsByName("password")[0].value});
    }

    render() {

        if (!this.props.errorToAccess) {
            return <form>
                <h2>Введите ваш новый пароль:</h2>
                <div>Пароль:</div>
                <input type="password" name="password" required/>
                <div>Повторите ваш новый пароль:</div>
                <input type="password" name="password" required/>
                <input type="button" value="Подтвердить" onClick={this.restore.bind(this)}/>
            </form>
        }
        else return <h2>Неверная или устаревшая ссылка!</h2>
    }

    componentWillMount() {
        // console.log(this.state.id);
        return this.props.checkToAccessRestore(this.state.id);
    }
    // componentWillReceiveProps(nextProps){
    //     this.props.checkToAccessRestore(this.state.id);
    // }

}


function mapStateToProps(state) {
    return {
        errorToAccess: state.errorToAccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        restorePass: bindActionCreators(funcs.restorePass, dispatch),
        checkToAccessRestore: bindActionCreators(funcs.checkToAccessRestore, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RestorePass)
