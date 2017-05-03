import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import {browserHistory} from 'react-router'
import { RaisedButton, Paper} from 'material-ui'
import * as noteAction from '../actions/NoteAction'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ExitBtn from './components/ExitBtn'
import NotesDashboard from './components/NotesDashboard'
import '../css/main.css'

export default class Dashboard extends Component {

    componentWillMount() {
        this.props.isInSystem();

    }
    isAdmin(){
        return this.props.userInSystem.role=="admin"? <RaisedButton className="button"  label="Администратор" href="/admin"/>:"";
    }

    render() {
        const {userInSystem,tasks} = this.props;
        const {changeTaskStatus,addTask,getTasks,cleanTasks,removeTask} = this.props;
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS: {
                return(
                <MuiThemeProvider>
                    <div>
                    <Paper>
                        <div className="main-container">
                            <div>
                                <h3>{userInSystem.email}, Вы в Dashboard!</h3>
                                {this.isAdmin()}
                    {/*<Link to="/admin">Администратор?</Link>*/}
                            </div>
                            <div> <RaisedButton className="button"  label="Настройки" href="/personalSettings"/></div>
                            <br/>
                            <div><ExitBtn/></div>
                        </div>
                    </Paper>
                    <NotesDashboard userInSystem={userInSystem} cleanTasks={cleanTasks} removeTask={removeTask} tasks={tasks} changeTaskStatus={changeTaskStatus} getTasks={getTasks} addTask={addTask}/>
                    </div>
                </MuiThemeProvider>)
            }
            break;
            default:{
                browserHistory.push("/login");
                return <div>Вы не имеете доступ в Dashboard!
                </div>}
                break;
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
        tasks:state.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch),
        changeTaskStatus:bindActionCreators(noteAction.changeTaskStatus, dispatch),
        addTask:bindActionCreators(noteAction.addTask, dispatch),
        getTasks:bindActionCreators(noteAction.getTasks, dispatch),
        cleanTasks:bindActionCreators(noteAction.cleanTasks, dispatch),
        removeTask:bindActionCreators(noteAction.removeTask, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
