import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as loadCompAction from '../actions/LoadComponentAction'
import * as login from '../actions/LoginAction'
import LoadingPage from "./LoadingPage"
import enums from "../constans/Const"

export default class Dashboard extends Component {

    componentWillMount() {
        this.props.isInSystem();
    }

    render() {
        const {userInSystem} = this.props;
        switch (this.props.loadingStatus) {
            case enums.LOAD_REQUEST:
                return <LoadingPage/>;
                break;
            case enums.LOAD_USER_SUCCESS: {
                return <div>Вы в Dashboard!
                    <div>
                        Your email is {userInSystem.email}
                    </div>
                    <Link to="/admin">Администратор?</Link>
                </div>
            }
            break;
            default:{
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
        loadingStatus:state.loadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        isInSystem:bindActionCreators(login.isInSystem, dispatch),
        loadComponentAction:bindActionCreators(loadCompAction.loadComponentAction, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
