import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {RaisedButton, Paper, Avatar} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import * as funcs from '../actions/ForgotPass'
import * as changers from '../actions/UserSettingAction'
import '../css/main.css'

class PersonalSettings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: {},
            data_uri: null,
            processing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileUpload(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };

        reader.readAsDataURL(file);
        console.log(reader);
    }

    avatar(){
        if(this.props.userInSystem.data_uri==undefined)
            return"";
        return <Avatar size={60} src={this.props.userInSystem.data_uri} alt={this.props.userInSystem.filename}/>
    }

    informationPrint() {
        return this.props.information ? this.props.information : "Изменить персональные данные";
    }

    handleChange(event) {
        const {user} = this.state;
        console.log(event.target.name);

        user[event.target.name] = event.target.value;
        this.setState({user});
    }

    handleSubmitEmail() {
        this.props.changeEmail({
            "pass": "" + document.getElementsByName("oldPassword0")[0].value,
            "email": "" + document.getElementsByName("email")[0].value,
            "_id": this.props.userInSystem._id
        })
        // browserHistory.push("/login");
    }

    handleSubmitPass() {
        this.props.changePass({
            "pass": "" + document.getElementsByName("oldPassword")[0].value,
            "newPass": "" + document.getElementsByName("password")[0].value,
            "_id": this.props.userInSystem._id
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

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            processing: true
        });
// onCheck.log(this.state.data_uri,
//              // this.state.filename,
//              this.state.filetype);

        this.props.changeImage({
            data_uri: this.state.data_uri,
            filename: this.state.filename,
            filetype: this.state.filetype,
            _id: this.props.userInSystem._id
        })

    }

    render() {
        const {user} = this.state;

        //onCheck.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_FAIL:
                BrowserRouter.push("/login");
                return <LoadingPage/>;
                break;
            default:
                return (
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                {this.avatar()}
                                <div>
                                    <h3> {this.informationPrint()}</h3>
                                    <br/>
                                    <div  hidden={this.props.userInSystem.OAuth!=undefined}>
                                    <Paper>
                                        <ValidatorForm
                                            onSubmit={this.handleSubmitEmail.bind(this)}
                                        >
                                            <TextValidator
                                                floatingLabelText="Email"
                                                onChange={this.handleChange}
                                                name="email"
                                                value={user.email}
                                                validators={['isEmail', 'required']}
                                                errorMessages={['это не email', 'это поле обязатальное']}
                                            />
                                            <br/><TextValidator
                                            floatingLabelText="Старый пароль"
                                            onChange={this.handleChange}
                                            name="oldPassword0"
                                            type="password"
                                            validators={['required']}
                                            errorMessages={['это поле обязатальное']}
                                            value={user.oldPassword0}
                                        />
                                            <RaisedButton primary='true' type="submit" className="button"
                                                          label="Подтвердить"
                                                          fullWidth="true"/>
                                        </ValidatorForm>
                                    </Paper>
                                    <br/>
                                    <Paper>
                                        <ValidatorForm
                                            onSubmit={this.handleSubmitPass.bind(this)}
                                        >
                                            <TextValidator
                                                floatingLabelText="Старый пароль"
                                                onChange={this.handleChange}
                                                name="oldPassword"
                                                type="password"
                                                validators={['required']}
                                                errorMessages={['это поле обязатальное']}
                                                value={user.oldPassword}
                                            />
                                            <br/> <TextValidator
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
                                    </Paper>
                                    <br/>
                                    <RaisedButton labelColor="#32CD32" href="/dashboard" label="Dashboard"/>
                                </div>
                                </div>
                            </div>

                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <input type="file" onChange={this.handleFileUpload.bind(this)}/>
                                <input disabled={this.state.processing} className='btn btn-primary' type="submit"
                                       value="Upload"/>
                                {this.state.processing}
                                {this.preImage()}
                            </form>
                        </Paper>
                    </MuiThemeProvider>);

                break;

        }
    }

    preImage() {
        if (this.state.data_uri != undefined) {
            return <Avatar src={this.state.data_uri} alt={this.state.filename}/>;
            {/*<img src={this.state.data_uri} alt={this.state.filename} className="avatar"></img>*/}
        }
        return "";
    }

    componentWillUnmount() {
        this.props.backupInformation();
        this.props.loadComponentAction();
    }
}


function mapStateToProps(state) {
    return {
        loadingStatus: state.loadingStatus,
        information: state.information,
        userInSystem: state.userInSystem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        backupInformation: bindActionCreators(funcs.backupInformation, dispatch),
        changeEmail: bindActionCreators(changers.changeEmail, dispatch),
        changePass: bindActionCreators(changers.changePass, dispatch),
        changeImage: bindActionCreators(changers.changeImage, dispatch),
        isInSystem: bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction: bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonalSettings)
