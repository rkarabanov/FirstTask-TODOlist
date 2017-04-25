import React, { Component } from 'react'
import { connect } from 'react-redux'
export default class Dashboard extends Component {
    render() {
        const {  userInSystem } = this.props;
        return <div>Вы в Dashboard!
            <div>
                Your email is {userInSystem.email}
            </div>
        </div>
    }


}

function mapStateToProps (state) {
    return {
        userInSystem:state.userInSystem
    }
}


export default connect(mapStateToProps)(Dashboard)
