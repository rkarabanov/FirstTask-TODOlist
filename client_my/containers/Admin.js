import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import * as adminAction from '../actions/AdminAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import UsersList from "./components/UsersList"
import * as noteAction from '../actions/NoteAction'
import { Paper,Avatar,FloatingActionButton, FontIcon, IconButton, ListItem, List,} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentInput from 'material-ui/svg-icons/action/input'
import '../css/main.css'

class Admin extends Component {

    componentWillMount() {
        this.props.isInSystem();
        this.props.getAllUsers();
    }
    avatar(){
        if(this.props.userInSystem.data_uri==undefined)
            return"";
        return <Avatar size={60} src={this.props.userInSystem.data_uri} alt={this.props.userInSystem.filename}/>
    }

    render() {
        //onCheck.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            default: {

                if (this.props.userInSystem.role != undefined && this.props.userInSystem.role == 'admin') {
                    const {userInSystem,tasks,allUsers} = this.props;
                    const {changeTaskStatus,addNote,addTask,getTasks,cleanTasks,removeTask,cleanUsers,getAllUsers} = this.props;
                    return(
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <div>{this.avatar()}</div>
                                    <h3>Welcome, {this.props.userInSystem.email}, Вы в Admin!</h3>

                                </div>

                            </div>
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
                                       allUsers={allUsers}
                            />
                        </Paper>


                    </MuiThemeProvider>);}
                else  return(
                    <MuiThemeProvider style="heigth:100vh;">
                        <Paper style="heigth:100vh;">
                            <div className="main-container" >
                                <div>
                                    <h3>HTTP Forbidden 403</h3>
                                </div>
                            </div>
                        </Paper>
                    </MuiThemeProvider>
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
        cleanTasks:bindActionCreators(noteAction.cleanTasks, dispatch),
        removeTask:bindActionCreators(noteAction.removeTask, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin)