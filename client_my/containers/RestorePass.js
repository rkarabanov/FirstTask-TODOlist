import React, {PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as funcs from '../actions/RestorePass'




export default class RestorePass extends Component {

    restore(e){
        console.log(this.props.errorToAccess);
        // this.props.restorePass(this.props.params.id,{"email":""+document.getElementsByName("email")[0].value});
    }

    render() {
        if(this.props.errorToAccess!=undefined&&errorToAccess)
            return <h2>
                Неверная или уже устаревшая ссылка
            </h2>;
            else
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

RestorePass.propTypes = {
    errorToAccess: PropTypes.bool
};

export default connect(mapStateToProps,mapDispatchToProps)(RestorePass)
