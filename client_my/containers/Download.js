import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as download from '../actions/DownloadFileAction'

class Registration extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.downloadExcel();
    }

    link() {
        if (this.props.file != undefined)
            return <a href={this.props.file}>Here</a>

        else return "";
    }

    render() {
        return <div>Download
            {this.link()}
        </div>
    }

}

function mapStateToProps(state) {
    return {
        file: state.file
    }
}

function mapDispatchToProps(dispatch) {
    return {
        downloadExcel: bindActionCreators(download.downloadExcel, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Registration)