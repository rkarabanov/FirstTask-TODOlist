import React, {PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as funcs from '../actions/RestorePass'




export default class RestorePass extends Component {

    restore(e){
        this.props.restorePass(this.props.location.query.id,{"pass":""+document.getElementsByName("password")[0].value});
    }

    render() {

        return <form>
            <h2>Введите ваш новый пароль:</h2>
            <div>Пароль:</div>
            <input type="password" name="password" required/>
            <div>Повторите ваш новый пароль:</div>
            <input type="password" name="password" required/>
            <input type="button" value="Подтвердить" onClick={this.restore.bind(this)}/>
        </form>
    }

    componentWillMount() {
        console.log(this.props.location.query.id);
        this.props.checkToAccessRestore(this.props.location.query.id)
    }
}


function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        restorePass: bindActionCreators(funcs.restorePass, dispatch),
        checkToAccessRestore: bindActionCreators(funcs.checkToAccessRestore, dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(RestorePass)
