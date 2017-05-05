import enums from "../constans/Const"

const initialState ={
	errorToAccess: true,
	information: '',
	userInSystem: {},
	loadingStatus: enums.LOAD_REQUEST,
	tasks:[],
	allUsers:[]
	// file:{}
};

export default initialState;