import React, {Component} from 'react'
import './css/dropdown.css'

class Dropdown extends Component {
    constructor(props){
        super(props);
        this.operation = ['Local', 'Upload']
        this.state = {
            isActive: false,
            selected: '',
        }
    }

    Active = () => {

        this.setState({
            isActive: !this.state.isActive
        })
    }
    
    cc = (option) => {
        this.props.context(option)
    }

    render(){
        return (
            <div className='dropdown' >
                <div className='dropdown-btn' onClick={this.Active}>

                    {this.props.selected}
                    {this.state.isActive && (<div className='dropdown-content'>
                        {this.operation.map(option => {
                            return(
                            <div className='dropdown-item' onClick={()=>{this.cc(option);this.setState({isActive: false})}}>{option}</div>)
                        })}
                    </div>)}
                </div>
            </div>
        )
    }

}

export default Dropdown
