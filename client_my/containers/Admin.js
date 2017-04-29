import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"
import { Paper} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import '../css/main.css'

class Admin extends Component {

    componentWillMount() {
        this.props.isInSystem();
    }


    render() {
        //console.log(this.props.userInSystem);
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            default: {
                if (this.props.userInSystem.role!=undefined&&this.props.userInSystem.role=='admin') return(
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
                                <div>
                                    <h3>Welcome, {this.props.userInSystem.email}, Вы в Admin!</h3>
                                </div>
                            </div>
                        </Paper>
                    </MuiThemeProvider>);
                else  return(
                    <MuiThemeProvider>
                        <Paper>
                            <div className="main-container">
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
        loadingStatus:state.loadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Admin)