import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Info extends Component {
    render() {
        console.log(this.props.userInSystem);
        if (this.props.userInSystem.role!=undefined&&this.props.userInSystem.role=='admin'){
            return  <div><h2>Welcome,</h2>
            {this.props.userInSystem.email}</div>}
            else{
            return  <div>HTTP Forbidden</div>
        }
        }
}



function mapStateToProps (state) {
    console.log(state);
    return {
        userInSystem:state.userInSystem
    }
}


export default connect(mapStateToProps)(Info)