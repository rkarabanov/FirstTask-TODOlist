import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import * as reg from '../actions/RegAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import GoogleLogin from 'react-google-login'
import secret from "../../config/auth"
import * as funcs from '../actions/ForgotPass'
import '../css/main.css'

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    informationPrint() {
        return this.props.information ? this.props.information : "Регистрация";
    }

    handleChange(event) {
        const {user} = this.state;
        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    handleSubmit() {
        this.props.regAction({
            "email": "" + document.getElementsByName("email")[0].value,
            "pass": "" + document.getElementsByName("password")[0].value
        })
        // browserHistory.push("/login");
    }

    componentWillMount() {
        this.props.isInSystem();
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }


    render() {
        const {user} = this.state;

        //onCheck.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS:
                BrowserRouter.push("/dashboard");
                return <LoadingPage/>;
                break;
            default:
                const responseGoogle = (response) => {
                    console.log(response.profileObj);
                    this.props.regAction({
                        "email": "" + response.profileObj.email,
                        "OAuth": true,
                        "pass": "" + response.profileObj.googleId,
                        "imageUrl": "" + response.profileObj.imageUrl,
                        "filename": "" + response.profileObj.name,
                        "filetype": "image/jpeg"
                    });
                };
                const responseFGoogle = (err) => {
                    console.log("fail", err);
                };
                return (
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <h3> {this.informationPrint()}</h3>
                                    <br/>
                                    <ValidatorForm
                                        onSubmit={this.handleSubmit.bind(this)}
                                    >
                                        <TextValidator
                                            floatingLabelText="Email"
                                            onChange={this.handleChange}
                                            name="email"
                                            value={user.email}
                                            validators={['isEmail', 'required']}
                                            errorMessages={['это не email', 'это поле обязатальное']}
                                        />
                                        <br/>
                                        <TextValidator
                                            floatingLabelText="Пароль"
                                            onChange={this.handleChange}
                                            name="password"
                                            type="password"
                                            validators={['required']}
                                            errorMessages={['это поле обязатальное']}
                                            value={user.password}
                                        />
                                        <br/>
                                        <TextValidator
                                            floatingLabelText="Повторите пароль"
                                            onChange={this.handleChange}
                                            name="repeatPassword"
                                            type="password"
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['пароли не совпадают', 'это поле обязатальное']}
                                            value={user.repeatPassword}
                                        />
                                        <br/>
                                        <RaisedButton primary='true' type="submit" className="button"
                                                      label="Подтвердить"
                                                      fullWidth="true"/>
                                    </ValidatorForm>
                                    <br/>
                                    <div className="mtb">
                                        <GoogleLogin
                                            clientId={secret.googleAuth.clientID}
                                            buttonText="Google Registration"
                                            onSuccess={responseGoogle}
                                            onFailure={responseFGoogle}
                                        />
                                    </div>
                                    <br/>
                                    <RaisedButton labelColor="#32CD32" href="/login" label="Войти"/>
                                    <br/>

                                </div>
                            </div>
                        </Paper>
                    </MuiThemeProvider>);

                break;

        }
    }

    componentWillUnmount() {
        this.props.backupInformation();
        this.props.loadComponentAction();
    }
}


function mapStateToProps(state) {
    return {
        loadingStatus: state.loadingStatus,
        information: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backupInformation: bindActionCreators(funcs.backupInformation, dispatch),
        regAction: bindActionCreators(reg.regAction, dispatch),
        isInSystem: bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction: bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)