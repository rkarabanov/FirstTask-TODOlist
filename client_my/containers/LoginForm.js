import React, {PropTypes, Component} from 'react'
import enums from "../constans/Const"
import LoadingPage from "./LoadingPage"
import {browserHistory} from 'react-router'
import { RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GoogleLogin from 'react-google-login'
import '../css/main.css'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import * as firebase from "firebase";


var config = {
    apiKey: "AIzaSyCyugkXlKWM910SLjgnRKKKL7FvVIhuWWM",
    authDomain: "quick-start-ac407.firebaseapp.com",
    databaseURL: "https://quick-start-ac407.firebaseio.com",
    projectId: "quick-start-ac407",
    storageBucket: "quick-start-ac407.appspot.com",
    messagingSenderId: "438876745891"
};
firebase.initializeApp(config);

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
        // let GoogleAuth; // Google Auth object.
        // function initClient() {
        //     gapi.client.init({
        //         'apiKey': 'AIzaSyBSC2CnsxwNZm4B5bWMSA5z-CF5SvJhvGs',
        //         'clientId': '862453605228-gqunseeo604i6cl9g1mfr56logrhnacq.apps.googleusercontent.com',
        //         'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        //         'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
        //     }).then(function () {
        //         GoogleAuth = gapi.auth2.getAuthInstance();
        //
        //         // Listen for sign-in state changes.
        //         GoogleAuth.isSignedIn.listen(updateSigninStatus);
        //         console.log(GoogleAuth);
        //     });
        // }
        // GoogleAuth.signIn();
        const {email, pass} = this.state;
        const responseGoogle = (response) => {
            console.log(response);
        };
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
                            <GoogleLogin
                                clientId="862453605228-gqunseeo604i6cl9g1mfr56logrhnacq.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
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