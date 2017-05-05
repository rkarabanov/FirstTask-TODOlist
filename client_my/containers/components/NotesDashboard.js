import React, {PropTypes, Component} from 'react'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Paper, ListItem, List, Checkbox, FloatingActionButton,IconMenu,Menu,MenuItem, FontIcon, IconButton, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/delete-sweep'
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit'
import ContentMore from 'material-ui/svg-icons/navigation/more-horiz'
import Modal from 'react-awesome-modal'
import Divider from 'material-ui/Divider';
import dateFormat from 'dateformat';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import '../../css/main.css'

export default class NotesDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            email: "",
            title:"",
            btn: <RaisedButton label="Отправить" type="submit"/>,
            tasks: ["Выбрать Трампа", "Do America Great Again"],
            edit:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }


    handleChange(event) {
        const email = event.target.value;
        this.setState({email: email});
    }

    handleChangeTitle(event) {
        const title = event.target.value;
        this.setState({title: title});

    }

    onCheck(e) {
        this.props.changeTaskStatus({
            userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            note: this.props.tasks[e.target.value]
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
    }

    deleteTask(e,index ) {

        console.log("deleteTask ");
        console.log(""+e);
        this.props.removeTask({userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            note:this.props.tasks[""+e]
        });
    }

    edit(e,index ) {

        console.log("editTask ");
        this.setState({edit:true});
    }

    addTaskToServer(e) {
        // this.props.backupInformation();
        this.setState({btn: <RaisedButton label="Отправка..." disabled="true" type="submit"/>});
        if(this.state.edit){
            this.props.changeTask({
                userID: this.props.userInSystem._id,
                pass: this.props.userInSystem.pass,
                task: "" + document.getElementsByName("text")[0].value
            });
        }
        else{
        this.props.addTask({
            userID: this.props.userInSystem._id,
            pass: this.props.userInSystem.pass,
            task: "" + document.getElementsByName("text")[0].value,
            title: "" + document.getElementsByName("title")[0].value
        });}
        // setTimeout(function () {
        //     this.setState({email: "", btn: <RaisedButton label="Отправить" type="submit"/>});
        //     console.log(2000);
        //     this.closeModal();
        // }.bind(this), 2000);
        this.setState({email: "",title:"", edit:false, btn: <RaisedButton label="Отправить" type="submit"/>});
        this.closeModal();
    }

    componentWillMount() {
        console.log(this.props.userInSystem, "getTasks");
        let userinfo={pass:this.props.userInSystem.pass,_id:this.props.userInSystem._id};
        this.props.getTasks(userinfo);
    }

    addBtn(){
        return  this.props.observer!==undefined?"":(<div className="addBtn">
                <FloatingActionButton onClick={this.addClick.bind(this)}
                                      secondary={true}><ContentAdd /></FloatingActionButton></div>
            )
    }

    download(){
        this.props.downloadExcel({pass:this.props.userInSystem.pass,_id:this.props.userInSystem._id})
    }

    render() {
        console.log(this.props.tasks);
        const listItems = (Array.isArray(this.props.tasks)
            && this.props.tasks.length > 0
        )?(this.props.observer!==undefined?(this.props.tasks.map((note, index) =>
            <span> <ListItem primaryText={<b>note.title</b> +" "+note.task}
                             secondaryText={"Изменён "+note.updated_at} key={index}
                             leftCheckbox={<Checkbox
                                 value={index}
                                 checked={note.status} disabled={true}></Checkbox>}
                            />
               <Divider /></span>))
            : this.props.tasks.map((note, index) =>
                <span> <ListItem primaryText={note.title}
                                 onClick={this.edit.bind(this,index)}
                             secondaryText={
                                 note.task.toUpperCase()+"      Изменён: "+dateFormat(note.updated_at,"mmmm dS, yyyy, h:MM")}
                             key={index}
                             leftCheckbox={<Checkbox onCheck={this.onCheck.bind(this)}
                                                     value={index}
                                                     defaultChecked={note.status}></Checkbox>}
                             // rightIconButton={
                             //     <IconButton><div className="ml-10"><ContentEdit onClick={this.edit.bind(this,index)} /></div>
                             //      </IconButton>
                             // }
                                 rightIcon={<ContentRemove onClick={this.deleteTask.bind(this,index)}/>}
                />
               <Divider /></span>
        )) : "У вас нету ни одного задания";
        const {email,title} = this.state;
        return (
            <div>
                    <Paper>
                        <div className="pb10">
                            <List>{listItems}</List>
                            <br/>
                            {this.addBtn()}
                            {/*<br/>*/}
                            <div className="fr"><RaisedButton label="Скачать в .xlsx"  onClick={this.download.bind(this)}/></div>
                        </div>
                    </Paper>

                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp"
                       onClickAway={() => this.closeModal()}>
                    <div className="main-container">
                        <div>

                        <ValidatorForm
                            ref="form"
                            onSubmit={this.addTaskToServer.bind(this)}
                        >
                            <TextValidator
                                floatingLabelText="Заголовок"
                                onChange={this.handleChangeTitle}
                                name="title"
                                value={title}
                                validators={['required']}
                                errorMessages={['это поле обязатальное']}
                            />
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

    }


    componentWillUnmount() {
        this.props.cleanTasks();
    }
}


NotesDashboard.propTypes = {
    observer:PropTypes.bool,
    tasks: PropTypes.array,
    userInSystem: PropTypes.object.isRequired,
    changeTask: PropTypes.func.isRequired,
    changeTaskStatus: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    cleanTasks: PropTypes.func.isRequired,
    downloadExcel: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired
};