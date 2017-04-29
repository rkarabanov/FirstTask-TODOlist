import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import {browserHistory} from 'react-router'
import {RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../css/main.css'

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{}
        };
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleSubmit() {

        browserHistory.push("/login");
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
        const { user } = this.state;
        //console.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS:
                browserHistory.push("/dashboard");
                return <LoadingPage/>;
                break;
            default:
                return(
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <h3>Регистрация</h3>
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
                                                      fullWidth="true" />
                                    </ValidatorForm>
                                    <br/>
                                    <RaisedButton labelColor="#32CD32" href="/login" label="Войти"/>
                                </div>
                            </div>
                        </Paper>
                    </MuiThemeProvider>);

               break;

        }
    }
    componentWillUnmount() {
        this.props.loadComponentAction();
    }
}



function mapStateToProps (state) {
    return {
        loadingStatus:state.loadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Registration)