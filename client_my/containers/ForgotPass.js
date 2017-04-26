import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as sendInstructions from '../actions/ForgotPass'




export default class ForgotPass extends Component {

    sendInstructionsClick(e){
        console.log(this.props.sendInstructions.sendInstructions);
        this.props.sendInstructions.sendInstructions({"email":""+document.getElementsByName("email")[0].value});
    }

    render() {
        return <form>
            <h2>Введите ваш email-адресс, для инстркукций по востановлению</h2>
            <div>Email:</div>
            <input type="email" name="email" required/>
            <input type="button" value="Подтвердить" onClick={this.sendInstructionsClick.bind(this)}/>
        </form>
    }


}
function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendInstructions: bindActionCreators(sendInstructions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPass)
