import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import { TimelineMax } from 'gsap';

class Title extends React.Component {
    constructor() {
        super();
        this.title = null;
    }

    componentDidMount() {
        // kickstart animation
            new TimelineMax({repeat:-1, yoyo:true}).fromTo(this.title, 2, 
                { opacity:0.5, scale:0.995 }, { opacity:1, scale:1});
	}
    render() {
        return(
            <div ref={div => (this.title = div)} className="title">
                <h2>Sorting Visualizer</h2>
                <h3>Algorithm: {this.props.algorithm}</h3>
            </div>
        );
    }
}

export default Title;