import React, {PropTypes, Component} from 'react'
import enums from "../constans/Const"
import LoadingPage from "./LoadingPage"
import {browserHistory} from 'react-router'
import { RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../css/main.css'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


export default class LoginForm extends Component {


    toLogin(e) {
        this.props.loginAction({
            "email": "" + document.getElementsByName("email")[0].value,
            "pass": "" + document.getElementsByName("password")[0].value
        });
    }



    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    componentWillMount() {
        this.props.isInSystem();
    }

    informationPrint(){
        return this.props.information ?this.props.information:"Пожалуйста авторизируйтесь!";
    }

    handleChangeEmail(event) {
        const email = event.target.value;
        this.setState({email: email, pass: this.state.pass});
    }

    handleChange(event) {
        const pass = event.target.value;
        this.setState({email: this.state.email, pass: pass});
    }

    render() {
        const {email, pass} = this.state;
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
                return (
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <h3>{this.informationPrint()}</h3>
                                    <ValidatorForm ref="form" onSubmit={this.toLogin.bind(this)}>
                                        <TextValidator
                                            floatingLabelText="Email"
                                            onChange={this.handleChangeEmail}
                                            name="email"
                                            value={email}
                                            validators={['isEmail', 'required']}
                                            errorMessages={['это не email', 'это поле обязатальное']}
                                        />
                                        <br/>
                                        <TextValidator
                                            floatingLabelText="Пароль"
                                            onChange={this.handleChange}
                                            type="password"
                                            name="password"
                                            value={pass}
                                            validators={['required']}
                                            errorMessages={['это поле обязатальное']}
                                        />
                                        <br/>
                                        <RaisedButton primary='true' type="submit" className="button" id="ok"
                                                      label="Подтвердить"
                                                      fullWidth="true"/>
                                    </ValidatorForm>
                                    <br/>
                                    {/*<RaisedButton  secondary='true' href="/login" label="Регистрация"/>*/}
                                </div>
                                <div className="forgot">
                                    <RaisedButton  secondary='true' href="/registration" label="Регистрация"/>
                                    <RaisedButton className="button" label="Забыли пароль?" href="/forgotPass"/>
                                </div>
                            </div>
                        </Paper>
                    </MuiThemeProvider>
                );

        }
    }

    componentWillUnmount() {
        this.props.loadComponentAction();
        this.props.backupInformation();
    }

}

LoginForm.propTypes = {
    information: PropTypes.string.isRequired,
    loadingStatus: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired,
    isInSystem: PropTypes.func.isRequired,
    backupInformation: PropTypes.func.isRequired,
    loadComponentAction: PropTypes.func.isRequired
};