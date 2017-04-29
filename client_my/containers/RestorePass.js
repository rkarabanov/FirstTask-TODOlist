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
          user:{}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {

    }

    handleChange(event) {
        console.log(this,event);
        this.setState({ password:event.target.value});
    }
    handleChangeRepeatPass(event) {
        console.log(this,event);
        this.setState({repeatPassword: event.target.value});
    }
    handleSubmit() {
        this.props.restorePass(this.props.location.query.id, {"pass": "" + document.getElementsByName("password")[0].value});
        browserHistory.push("/login");
    }

    // restore(e) {
    //     this.props.restorePass(this.props.location.query.id, {"pass": "" + document.getElementsByName("password")[0].value});
    // }

    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    componentWillMount() {
        // console.log(this.state.id);
        this.props.isInSystem();
        this.props.checkToAccessRestore(this.props.location.query.id);
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    render() {
        const { user } = this.state;
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;

            case enums.LOAD_USER_SUCCESS: {
                browserHistory.push("/dashboard");
                return <LoadingPage/>;
                break;
            }
            default:
                if (!this.props.errorToAccess) {

                    return(
                        <MuiThemeProvider>
                            <Paper>
                                <div className="main-container">
                                    <div>
                                        <h3>Введите новый пароль:</h3>
                                        <br/>
                                        <ValidatorForm
                                            onSubmit={this.handleSubmit.bind(this)}
                                        >
                                            <TextValidator
                                                floatingLabelText="Новый пароль"
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
                                    </div>
                                </div>
                            </Paper>
                        </MuiThemeProvider>);


                    // return <form>
                    //     <h2>Введите ваш новый пароль:</h2>
                    //     <div>Пароль:</div>
                    //     <input type="password" name="password" required/>
                    //     <div>Повторите ваш новый пароль:</div>
                    //     <input type="password" name="password" required/>
                    //     <input type="button" value="Подтвердить" onClick={this.restore.bind(this)}/>
                    // </form>
                }
                else return(
                <MuiThemeProvider>
                    <Paper>
                        <div className="main-container">
                            <div>
                                <h3>Неверная или устаревшая ссылка!</h3>
                            </div>
                        </div>
                    </Paper>
                </MuiThemeProvider>);
                break;
        }

        // if (!this.props.errorToAccess) {
        //     return <form>
        //         <h2>Введите ваш новый пароль:</h2>
        //         <div>Пароль:</div>
        //         <input type="password" name="password" required/>
        //         <div>Повторите ваш новый пароль:</div>
        //         <input type="password" name="password" required/>
        //         <input type="button" value="Подтвердить" onClick={this.restore.bind(this)}/>
        //     </form>
        // }
        // else return <h2>Неверная или устаревшая ссылка!</h2>
    }



    componentWillUnmount() {
        this.props.loadComponentAction();
    }



}


function mapStateToProps(state) {
    return {
        loadingStatus: state.loadingStatus,
        errorToAccess: state.errorToAccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        restorePass: bindActionCreators(funcs.restorePass, dispatch),
        checkToAccessRestore: bindActionCreators(funcs.checkToAccessRestore, dispatch),
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RestorePass)
