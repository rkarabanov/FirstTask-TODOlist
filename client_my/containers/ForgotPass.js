import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as funcs from '../actions/ForgotPass'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import { browserHistory} from 'react-router'
import {RaisedButton, Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import '../css/main.css'


export default class ForgotPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            btn:<RaisedButton label="Отправить" type="submit"/>
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    sendInstructionsClick(e) {
        // this.props.backupInformation();
        this.setState({email:this.state.email, btn:<RaisedButton label="Отправка..." disabled="true" type="submit"/>});

        this.props.sendInstructions({"email": "" + document.getElementsByName("email")[0].value});
        setTimeout(function() { this.setState({email: this.state.email,btn:<RaisedButton label="Отправить" type="submit"/>}); }.bind(this), 3000);
    }

    componentWillMount() {
        this.props.isInSystem();
    }

    handleChangeEmail(event) {
        const email = event.target.value;
        this.setState({email: email, btn:this.state.btn,buffer:this.state.buffer});

    }

    informationPrint(){
        return this.props.information?this.props.information:"Введите ваш email-адресс, для инстркукций по востановлению";
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log(nextProps,nextState);


        this.setState({email: this.state.email,btn:<RaisedButton label="Отправить" type="submit"/>});
        // onCheck.log(this.state.btn);
        return true;
    }

    render() {
        const {email} = this.state;
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS: {
                browserHistory.push("/dashboard");
                return <LoadingPage/>;
                break;
            }
            default: {
                return <MuiThemeProvider>
                    <Paper>
                        <div className="main-container">
                            <div>
                                <h3> {this.informationPrint()}
                                </h3>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.sendInstructionsClick.bind(this)}
                                >
                                    <TextValidator
                                        floatingLabelText="Email"
                                        onChange={this.handleChangeEmail}
                                        name="email"
                                        value={email}
                                        validators={['isEmail', 'required']}
                                        errorMessages={['это не email', 'это поле обязатальное']}
                                    />
                                    <br/>
                                    {/*<RaisedButton label="Отправить" type="submit"/>*/}
                                    {this.state.btn}
                                    <br/>
                                </ValidatorForm>
                            </div>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            }
                break;
        }
    }

    componentWillUnmount() {
        this.props.loadComponentAction();
        this.props.backupInformation();
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
        sendInstructions: bindActionCreators(funcs.sendInstructions, dispatch),
        backupInformation: bindActionCreators(funcs.backupInformation, dispatch),
        isInSystem: bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction: bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass)
