import React, {PropTypes, Component} from 'react'

export default class LoginForm extends Component {
    toLogin(e){
        this.props.loginAction({"email":""+document.getElementsByName("email")[0].value,"pass":""+document.getElementsByName("pass")[0].value});
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevProps);
        console.log(prevState);
    }

    render() {
        const {msg} = this.props;
        return <div>
            <div>
                {msg}
            </div>
            <form>
                <div>Пожалуйста авторизируйтесь!</div>
                <div>Email:</div>
                <input type="email" name="email" required/>
                <div> Пароль:</div>
                <input type="password" name="pass" required/>
                <br/>
                <input type="button" value="Подтвердить" onClick={this.toLogin.bind(this)}/>
                <input type="reset" value="Сбросить"/>
            </form>
        </div>;
    }
}

LoginForm.propTypes = {
    msg: PropTypes.string.isRequired,
    loginAction: PropTypes.func.isRequired
};