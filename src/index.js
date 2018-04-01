import React from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import { Grid } from './components/Grid';
import { Numpad } from './components/Numpad';

class App extends React.Component {
    constructor (props) {
        var i = 0;
        var values = '9...718..47.9.....6.2..37...8.45.3....7....9639..2.5.1..1....4....58.6...23.....5';
        var cells = [];

        super(props);

        for (;i < 81;i++) {
            // Create initial cells. Pre-calculate some useful things.
            let row = Math.floor(i / 9);
            let column = i % 9;
            let box = (Math.floor(row / 3) * 3) + Math.floor(column / 3); // Box is segment when cells
                                                                          // are mapped to 3 x 3 grid
            let value = values.slice(i, i + 1);
            let isDisabled = value !== '.';

            cells.push({
                index: i,
                value: isDisabled ? parseInt(value, 10) : '',
                disabled: isDisabled,
                row: row,
                column: column,
                box: box
            });
        }

        this.state = {
            cells: cells,
            selectedCell: null,
            complete: false
        }

        // Bind `this` keyword on certain functions
        this.selectCell = this.selectCell.bind(this);
        this.press = this.press.bind(this);
    }

    selectCell (cell) {
        // Cell has been clicked
        this.setState({
            selectedCell: cell
        });
    }

    press (key) {
        // Number has been clicked
        var selectedCell = this.state.selectedCell;
        var index = _.findIndex(this.state.cells, (cell) => {
            return cell.index === selectedCell
        });

        if (this.state.cells[selectedCell].disabled) {
            // If cell is in initial state, do nothing when clicked
            return;
        }

        if (index !== -1) {
            // If a cell is selected, change its value
            this.state.cells[index].value = key;

            this.setState({
                cells: this.state.cells
            });
        }
    }

    check (cells, group) {
        // Function to check groups contain all of numbers 1-9.
        // 'Groups' can be 'row', 'column' or 'box'. Returns boolean.
        var sets = [0,1,2,3,4,5,6,7,8];

        return _.every(sets, (set) => {
            // Collect cell objects
            var groupCells = _.filter(cells, (cell) => {
                return cell[group] === set;
            });

            // Flatten to values
            var values = _.flatMap(groupCells, (cell) => {
                return cell.value;
            });

            // Sort alphanumerically
            values.sort();

            // Are all numbers in group?
            return _.isEqual(values, [1,2,3,4,5,6,7,8,9]);
        });
    }

    isComplete () {
        // Return true if numbers 1-9 exist for all groups; 'row', 'column', and 'box'
        return this.check(this.state.cells, 'row')
            && this.check(this.state.cells, 'column')
            && this.check(this.state.cells, 'box')
    }

    render () {
        return <div>
            <h1>Sudoku</h1>
            <div className='grid-wrap'>
                <div className='win-overlay' style={{'display': this.isComplete() ? 'block' : 'none'}}><h2>You win</h2></div>
                <Grid cells={this.state.cells} selectCell={this.selectCell} selectedCell={this.state.selectedCell} />
            </div>
            <Numpad press={this.press} />
        </div>
    }
}

render(<App />, document.getElementById('app'));
