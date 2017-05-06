
import React, {PropTypes, Component} from 'react'
import { Paper,Avatar,FloatingActionButton, FontIcon, IconButton, ListItem, List,} from 'material-ui'
import Modal from 'react-awesome-modal'
import Divider from 'material-ui/Divider'
import ContentInput from 'material-ui/svg-icons/action/input'
import NotesDashboard from './NotesDashboard'
import '../../css/main.css'
import ReactPaginate from 'react-paginate'
// import Pagination from 'material-ui-pagination';


export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            watchUser:{},
            number:0,
            total:1
        };
        // this.handleChange = this.handleChange.bind(this);

    }


    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.props.cleanTasks();
        this.setState({
            visible: false
        });
    }
    watchUserList(e,i){
        console.log(e);
        // console.log(i);
        this.setState({
            watchUser:e
        });
        this.openModal();
        console.log(this.props.userInSystem, "getTasks");
        let userinfo={pass:e.pass,_id:e._id};
        this.props.getTasks(e);
    }

    componentWillMount() {
        let userinfo = {pass: this.props.userInSystem.pass, _id: this.props.userInSystem._id};
        this.props.getAllUsers(userinfo);
        // this.setState({total:Math.ceil(this.props.allUsers.length/10) });
    }

    // componentDidUpdate(){
    //     if(this.props.allUsers.length>0){
    //     this.setState({total:Math.ceil(this.props.allUsers.length/10) });}
    // }
    changeNum(e)
    {console.log(e.selected);
        this.setState({number:+e.selected});
    }

    render() {
        console.log(this.props.allUsers);

            const listItems = (Array.isArray(this.props.allUsers)) ? this.props.allUsers
                .filter((a,index)=>(index>=(this.state.number)*10&&index<(this.state.number+1)*10))
                .map((user, index) =>
                <span> <ListItem primaryText={user.email} key={index}
                                 leftAvatar={user.data_uri?<Avatar size={30} src={user.data_uri} alt={user.email}></Avatar>:<Avatar size={30}>{user.email.charAt(0)}</Avatar>}
                                  rightIconButton={<IconButton> <ContentInput
                                      onClick={this.watchUserList.bind(this, user)}/></IconButton>}/>
               <Divider /></span>
            ) : "Нет записей";
        const {tasks} = this.props;
        const {changeTaskStatus,addTask,getTasks,cleanTasks,removeTask,downloadExcel,changeTask} = this.props;
            return (

                <div>
                            <List>{listItems}</List>
                <br/>
                    {/*<Pagination*/}
                        {/*total = { Math.ceil(this.props.allUsers.length/10)|| 1 }*/}
                        {/*current = { this.state.number }*/}
                        {/*display = { 5 }*/}
                        {/*onChange  = { this.changeNum.bind(this)}*/}
                        {/*// onClick  = { this.changeNum.bind(this)}*/}
                    {/*/>*/}
                    <div className="paginaton">
                    <ReactPaginate
                        pageCount = { Math.ceil(this.props.allUsers.length/10)|| 1 }
                        pageRangeDisplayed= { this.props.allUsers<10*(this.state.number-1)?1:this.state.number}
                        marginPagesDisplayed= { 5 }
                        onPageChange={this.changeNum.bind(this)}
                    />
                    </div>
                    <br />
                    <Modal visible={this.state.visible} width="600" effect="fadeInUp"
                           onClickAway={() => this.closeModal()}>
                        <NotesDashboard userInSystem={this.state.watchUser}
                                        cleanTasks={cleanTasks}
                                        removeTask={removeTask}
                                        tasks={tasks}
                                        changeTaskStatus={changeTaskStatus}
                                        getTasks={getTasks}
                                        addTask={addTask}
                                        observer={true}
                                        downloadExcel={downloadExcel}
                                        changeTask={changeTask}
                        />
                    </Modal>
                </div>)
            // return <div>Hello, World!</div>
        }

        // shouldComponentUpdate(nextProps,nextState){
        //     return true;
        // }
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
    downloadExcel:PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
    cleanTasks: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    cleanUsers: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    changeTask:PropTypes.func.isRequired
};