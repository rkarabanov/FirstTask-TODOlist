import React, {PropTypes, Component} from 'react'
import { Link } from 'react-router'
import enums from "../constans/Const"
import LoadingPage from "./LoadingPage"
import {browserHistory} from 'react-router'
import {TextField,RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../css/main.css'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
    }

    toLogin(e){
        this.props.loginAction({"email":""+document.getElementsByName("email")[0].value,"pass":""+document.getElementsByName("pass")[0].value});
    }

    componentWillMount() {
        this.props.isInSystem();
    }


    render() {
        const {msg} = this.props;
        switch (this.props.loadingStatus){
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS:{
                browserHistory.push("/dashboard");
                return <LoadingPage/>;
                break;
            }
            default:
                return(
                    <MuiThemeProvider>
                        <Paper>
                            <div  className="main-container">
                            <h3>{msg}</h3>
                            <TextField type="email" name="email" floatingLabelText="Email" required />
                            <br/>
                            <TextField type="password" name="pass"  floatingLabelText="Пароль" required/>
                            <br/>
                            <RaisedButton primary='true'  label="Подтвердить" onClick={this.toLogin.bind(this)} fullWidth="true"/>
                            <br/>
                            <RaisedButton label="Забыли пароль?"  href="/forgotPass"/>
                        </div>
                        </Paper>

                    </MuiThemeProvider>
                );

        }
    }

    componentWillUnmount() {
        this.props.loadComponentAction();
    }

}

LoginForm.propTypes = {
    msg: PropTypes.string.isRequired,
    loadingStatus:PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
    isInSystem:PropTypes.func.isRequired,
    loadComponentAction:PropTypes.func.isRequired
};