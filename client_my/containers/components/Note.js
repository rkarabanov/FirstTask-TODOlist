import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../../actions/LoadComponentAction'
import * as login from '../../actions/LoginAction'
import LoadingPage from "../LoadingPage"
import enums from "../../constans/Const"
import { Paper, List,ListItem} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../../css/main.css'

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.initialColor
        };
    }



    render() {
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
     return
    }

}



// function mapStateToProps (state) {
//     return {
//         userInSystem:state.userInSystem,
//         loadingStatus:state.loadingStatus
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         isInSystem:bindActionCreators(login.isInSystem, dispatch),
//         loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
//     }
// }

// Note.propTypes = {
//     notes: PropTypes.array
// };