import React, {PropTypes, Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Paper,Avatar,FloatingActionButton, FontIcon, IconButton, ListItem, List,} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Modal from 'react-awesome-modal'
import Divider from 'material-ui/Divider';
import ContentInput from 'material-ui/svg-icons/action/input'
import NotesDashboard from './NotesDashboard'
import '../../css/main.css'

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            watchUser:{}
        };
        // this.handleChange = this.handleChange.bind(this);

    }


    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    watchUserList(e,i){
        console.log(""+e);
        this.setState({
            watchUser:this.props.getAllUsers[""+e]
        });
    }

    componentWillMount() {
        let userinfo = {pass: this.props.userInSystem.pass, _id: this.props.userInSystem._id};
        this.props.getAllUsers(userinfo);
    }

    render() {

        console.log(Array.isArray(this.props.allUsers));
            const listItems = (Array.isArray(this.props.allUsers)&&this.props.allUsers.length>0) ? this.props.allUsers.map((user, index) =>
                <span> <ListItem primaryText={user.email} key={index}
                                 leftAvatar={user.data_uri?<Avatar size={30} src={user.data_uri} alt={user.email}></Avatar>:<Avatar size={30}>{user.email.charAt(0)}</Avatar>}
                                  rightIconButton={<IconButton> <ContentInput
                                      onClick={this.watchUserList.bind(this, index)}/></IconButton>}/>
               <Divider /></span>
            ) : "";
        const {userInSystem,tasks} = this.props;
        const {changeTaskStatus,addTask,getTasks,cleanTasks,removeTask} = this.props;
            return (

                <div>
                    <MuiThemeProvider>

                        <MuiThemeProvider>
                            <List>{listItems}</List>
                        </MuiThemeProvider>

                    </MuiThemeProvider>
                    <Modal visible={this.state.visible} width="600" height="400" effect="fadeInUp"
                           onClickAway={() => this.closeModal()}>
                        <NotesDashboard userInSystem={this.state.watchUser}
                                        cleanTasks={cleanTasks}
                                        removeTask={removeTask}
                                        tasks={tasks}
                                        changeTaskStatus={changeTaskStatus}
                                        getTasks={getTasks}
                                        addTask={addTask}
                                        observer={true}
                        />
                    </Modal>
                </div>)
            // return <div>Hello, World!</div>
        }

        shouldComponentUpdate(nextProps,nextState){
            return true;
        }
        componentWillUnmount()
        {
            this.props.cleanUsers();
        }

}

UsersList.propTypes = {
    tasks: PropTypes.array,
    allUsers:PropTypes.array,
    userInSystem: PropTypes.object.isRequired,
    changeTaskStatus: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    cleanTasks: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    cleanUsers: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
};