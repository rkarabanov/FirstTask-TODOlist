import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
export default class Dashboard extends Component {
    render() {
        const {  userInSystem } = this.props;
        return <div>Вы в Dashboard!
            <div>
                Your email is {userInSystem.email}
            </div>
            <Link  to="/admin">Администратор?</Link>
        </div>
    }


}

function mapStateToProps (state) {
    return {
        userInSystem:state.userInSystem
    }
}


export default connect(mapStateToProps)(Dashboard)
