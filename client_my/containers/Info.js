import React, { Component } from 'react'
import { connect } from 'react-redux'

class Info extends Component {
    render() {
        return  <div>{this.props.information}</div>
    }
}

function mapStateToProps (state) {
    return {
        information:state.information
    }
}



export default connect(mapStateToProps)(Info)