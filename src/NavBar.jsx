import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Title from './Title.jsx';

class NavBar extends React.Component {
    render() {
        var status = "Start";
        if (!this.props.running)
            status = "Start";
        else
            status = "Running";

        return(
            <div className="bar">
            <Title algorithm={this.props.algorithm}/>
            <span className="navigation">
            Sorting Speed:
            <input  type="range" id="typeinp" min="1" max="101" defaultValue="100" step="5" 
                onInput={() => this.props.speed()}/>
                <button className="bts" type="button"  onClick={() => this.props.start()}> {status} </button>
                <button className="bt" type="button"  onClick={() => this.props.generate()}> new Array() </button>
                <button className="bt" type="button"  onClick={() => this.props.qs()}> Quick Sort </button>
                <button className="bt" type="button"  onClick={() => this.props.ss()}> Selection Sort </button>
                <button className="bt" type="button"  onClick={() => this.props.is()}> Insertion Sort </button>
            </span>
            </div>
        );
    }
}
export default NavBar;