import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as noteAction from '../../actions/NoteAction'
import LoadingPage from "../LoadingPage"
import enums from "../../constans/Const"
import {Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/main.css'

export default class NotesDashboard extends Component {


    render() {
        return ""
    }


}


NotesDashboard.propTypes = {
    notes: PropTypes.array.isRequired,
    userInSystem: PropTypes.object.isRequired,
    changeTaskStatus: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired
};