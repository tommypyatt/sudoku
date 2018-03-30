import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cells: [null,1,2,3,4,5,6,7,null,9,9,8,null,6,5,4,3,2,1],
            difficulty: 'Easy'
        }
    }

    render () {
        return <div><h2>{this.state.difficulty} puzzle</h2>
            <ul>
                {this.state.cells.map((cell, i) => {
                    return <li key={i}>{cell}</li>
                })}
            </ul>
        </div>
    }
}

render(<App/>, document.getElementById('app'));
