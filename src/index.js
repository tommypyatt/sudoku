import React from 'react';
import { render } from 'react-dom';
import { Grid } from './components/Grid';
import { Numpad } from './components/Numpad';

class App extends React.Component {
    constructor (props) {
        var i = 0;
        var cells = [];

        for (;i < 81;i++) {
            cells.push(null);
        }

        super(props);
        this.state = {
            cells: cells,
            difficulty: 'Easy',
            selectedCell: null
        }

        this.selectCell = this.selectCell.bind(this);
        this.press = this.press.bind(this);
    }

    selectCell (cell) {
        this.setState({
            selectedCell: cell
        });
    }

    press (key) {
        this.state.cells[this.state.selectedCell] = key;

        this.setState({
            cells: this.state.cells
        });
    }

    render () {
        return <div>
            <h1>Sudoku</h1>
            <Grid cells={this.state.cells} selectCell={this.selectCell} selectedCell={this.state.selectedCell} />
            <Numpad press={this.press} />
        </div>
    }
}

render(<App />, document.getElementById('app'));
