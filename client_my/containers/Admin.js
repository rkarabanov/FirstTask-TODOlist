import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import * as adminAction from '../actions/AdminAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import UsersList from "./components/UsersList"
import * as noteAction from '../actions/NoteAction'
import { Paper,Avatar,FloatingActionButton, FontIcon, IconButton, TextField,RaisedButton} from 'material-ui'
// import ContentInput from 'material-ui/svg-icons/action/input'
import * as download from '../actions/DownloadFileAction'
// import { createRenderer } from 'react-test-renderer/shallow';

import '../css/main.css'

class Admin extends Component {



    constructor(props) {
        super(props);
        this.state = {
            filterField: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({filterField: ""});
    }

    componentWillMount(){
        this.props.isInSystem();
        this.props.getAllUsers();
    }

    avatar(){
        if(this.props.userInSystem.data_uri===undefined)
            return"";
        return <Avatar size={60} src={this.props.userInSystem.data_uri} alt={this.props.userInSystem.filename}/>
    }

    handleChange(event,i) {
        // console.log(i);
        this.setState({filterField: i});
    }

    render() {
        //onCheck.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            default: {

                if (this.props.userInSystem.role !== undefined && this.props.userInSystem.role === 'admin') {
                    const {userInSystem,tasks,allUsers} = this.props;
                    const {changeTaskStatus,addNote,addTask,changeTask,getTasks,cleanTasks,removeTask,cleanUsers,getAllUsers,downloadExcel} = this.props;
                    return(
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <div>{this.avatar()}</div>
                                    <h3>Welcome, {this.props.userInSystem.email}, Вы в Admin!</h3>

                                </div>

                            </div>
                            <TextField
                                hintText="Поиск по email-у:"
                                onChange={this.handleChange.bind(this)}
                            /><br />
                            <UsersList userInSystem={userInSystem}
                                       cleanTasks={cleanTasks}
                                       removeTask={removeTask}
                                       tasks={tasks}
                                       changeTaskStatus={changeTaskStatus}
                                       getTasks={getTasks}
                                       addNote={addNote}
                                       addTask={addTask}
                                       getAllUsers={getAllUsers}
                                       cleanUsers={cleanUsers}
                                       allUsers={allUsers.filter(a=>this.state.filterField===undefined?true:a.email.includes(this.state.filterField))}
                                       downloadExcel={downloadExcel}
                                       changeTask={changeTask}
                            />
                            <br/><div className="addBtn pb10">
                            <RaisedButton labelColor="#32CD32" href="/dashboard" label="Dashboard"/>
                        </div>
                        </Paper>
);}
                else  return(
                        <Paper style="heigth:100vh;">
                            <div className="main-container" >
                                <div>
                                    <h3>HTTP Forbidden 403</h3>
                                </div>
                            </div>
                        </Paper>
                )
            }
        }
    }
    componentWillUnmount() {
        this.props.loadComponentAction();

    }
}




function mapStateToProps (state) {
    return {
        userInSystem:state.userInSystem,
        loadingStatus:state.loadingStatus,
        tasks:state.tasks,
        allUsers:state.allUsers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch),
        getAllUsers:bindActionCreators(adminAction.getAllUsers, dispatch),
        cleanUsers:bindActionCreators(adminAction.cleanUsers, dispatch),
        changeTaskStatus:bindActionCreators(noteAction.changeTaskStatus, dispatch),
        addTask:bindActionCreators(noteAction.addTask, dispatch),
        getTasks:bindActionCreators(noteAction.getTasks, dispatch),
        changeTask:bindActionCreators(noteAction.changeTask, dispatch),
        cleanTasks:bindActionCreators(noteAction.cleanTasks, dispatch),
        removeTask:bindActionCreators(noteAction.removeTask, dispatch),
        downloadExcel: bindActionCreators(download.downloadExcel, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin)