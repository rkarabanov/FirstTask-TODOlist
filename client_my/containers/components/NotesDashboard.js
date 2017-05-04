import React, {PropTypes, Component} from 'react'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Paper, ListItem, List, Checkbox, FloatingActionButton, FontIcon, IconButton, RaisedButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/delete-sweep'
import Modal from 'react-awesome-modal'
import Divider from 'material-ui/Divider';

import '../../css/main.css'

export default class NotesDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            email: "",
            btn: <RaisedButton label="Отправить" type="submit"/>,
            tasks: ["Выбрать Трампа", "Do America Great Again"]
        };
        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(event) {
        const email = event.target.value;
        this.setState({email: email});

    }

    onCheck(e) {
        // console.log(e.target.value);
        this.props.changeTaskStatus({
            userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            _id: this.props.tasks[e.target.value]
        })
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false,
            email: ""
        });
    }

    addClick() {
        this.openModal();
        // this.setState({buffer: true});
        // this.props.addTask({userID:this.props.userInSystem._id, pass:this.props.userInSystem.pass});
    }

    // addTaskToServer(){
    //     this.props.addTask({userID:this.props.userInSystem._id, pass:this.props.userInSystem.pass, task:});
    // }

    deleteTask(e,index ) {

        console.log("deleteTask ");
        console.log(""+e);
        this.props.removeTask({userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            _id:this.props.tasks[""+e]
        });
    }

    addTaskToServer(e) {
        // this.props.backupInformation();
        this.setState({btn: <RaisedButton label="Отправка..." disabled="true" type="submit"/>});
        this.props.addTask({
            userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            task: "" + document.getElementsByName("text")[0].value
        });
        // setTimeout(function () {
        //     this.setState({email: "", btn: <RaisedButton label="Отправить" type="submit"/>});
        //     console.log(2000);
        //     this.closeModal();
        // }.bind(this), 2000);
        this.setState({email: "", btn: <RaisedButton label="Отправить" type="submit"/>});
        this.closeModal();
    }

    componentWillMount() {
        console.log(this.props.userInSystem, "getTasks");
        let userinfo={pass:this.props.userInSystem.pass,_id:this.props.userInSystem._id};
        this.props.getTasks(userinfo);
    }

    addBtn(){
        return  this.props.observer!=undefined?"":(<div className="addBtn">
                <FloatingActionButton onClick={this.addClick.bind(this)}
                                      secondary={true}><ContentAdd /></FloatingActionButton></div>
            )
    }

    download(){
        this.props.downloadExcel({pass:this.props.userInSystem.pass,_id:this.props.userInSystem._id})
    }

    render() {
        console.log(this.props.tasks);
        const responseGoogle = (response) => {
            console.log(response);
        }
        const listItems = (Array.isArray(this.props.tasks)
            && this.props.tasks.length > 0
        )?(this.props.observer!=undefined?(this.props.tasks.map((note, index) =>
            <span> <ListItem primaryText={note.task} key={index}
                             leftCheckbox={<Checkbox
                                 value={index}
                                 checked={note.status} disabled={true}></Checkbox>}
                            />
               <Divider /></span>))
            : this.props.tasks.map((note, index) =>
            <span> <ListItem primaryText={note.task} key={index}
                             leftCheckbox={<Checkbox onCheck={this.onCheck.bind(this)}
                                                     value={index}
                                                     defaultChecked={note.status}></Checkbox>}
                             rightIconButton={<IconButton> <ContentRemove onClick={this.deleteTask.bind(this,index)}/></IconButton>}/>
               <Divider /></span>
        )) : "У вас нету ни одного задания";
        const {email} = this.state;
        return (
            <div>
                <MuiThemeProvider>
                    <Paper>
                        <div className="pb10">
                            <List>{listItems}</List>
                            <br/>
                            {this.addBtn()}
                            {/*<br/>*/}
                            <div className="fr"><RaisedButton label="Скачать в .xlsx"  onClick={this.download.bind(this)}/></div>
                        </div>
                    </Paper>

                </MuiThemeProvider>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp"
                       onClickAway={() => this.closeModal()}>
                    <div className="main-container">
                        <div>
                        {/*<h1>Title</h1>*/}
                        {/*<p>Some Contents</p>*/}
                        {/*<a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>*/}

                        <ValidatorForm
                            ref="form"
                            onSubmit={this.addTaskToServer.bind(this)}
                        >
                            <TextValidator
                                floatingLabelText="Задание"
                                onChange={this.handleChange}
                                name="text"
                                value={email}
                                validators={['required']}
                                errorMessages={['это поле обязатальное']}
                            />
                            <br/>
                            {/*<RaisedButton label="Отправить" type="submit"/>*/}
                            {this.state.btn}
                            <br/>

                        </ValidatorForm>
                        </div>
                    </div>
                </Modal>
            </div>)
        // return <div>Hello, World!</div>
    }

    // shouldComponentUpdate(nextProps,nextState){
    //
    //     return true;
    // }
    componentWillUnmount() {
        this.props.cleanTasks();
    }
}


NotesDashboard.propTypes = {
    observer:PropTypes.bool,
    tasks: PropTypes.array,
    userInSystem: PropTypes.object.isRequired,
    changeTaskStatus: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    cleanTasks: PropTypes.func.isRequired,
    downloadExcel: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired
};