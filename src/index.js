import React from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import { Grid } from './components/Grid';
import { Numpad } from './components/Numpad';

class App extends React.Component {
    constructor (props) {
        var i = 0;
        var values = '..526978.68257149.1978345628261.534737468291595174362851932687.24895713676341825.'
        var cells = [];

        for (;i < 81;i++) {
            let row = Math.floor(i / 9);
            let column = i % 9;
            let box = (Math.floor(row / 3) * 3) + Math.floor(column / 3);
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

        super(props);
        this.state = {
            cells: cells,
            difficulty: 'Easy',
            selectedCell: null,
            complete: false
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
        var selectedCell = this.state.selectedCell;
        var index = _.findIndex(this.state.cells, function (cell) {
            return cell.index === selectedCell
        });

        if (this.state.cells[selectedCell].disabled) {
            return;
        }

        if (index !== -1) {
            this.state.cells[index].value = key;

            this.setState({
                cells: this.state.cells
            });

            this.updateComplete();
        }
    }

    updateComplete () {
        var complete = true;

        _.forEach(this.state.cells, function (cell) {
            if (!this.isCellOk(cell)) {
                complete = false;
            }
        }.bind(this));

        if (complete === true) {
            this.setState({
                complete: true
            });
        }
    }

    isCellOk (cell) {
        var row = _.filter(this.state.cells, function (c) {
            return c.row === cell.row;
        });
        var col = _.filter(this.state.cells, function (c) {
            return c.column === cell.column;
        });
        var box = _.filter(this.state.cells, function (c) {
            return c.box === cell.box;
        });

        var flatRow = _.flatMap(row, function (item) {
            return item.value
        }).sort();
        var flatCol = _.flatMap(col, function (item) {
            return item.value
        }).sort();
        var flatBox = _.flatMap(col, function (item) {
            return item.value
        }).sort();

        return _.isEqual(flatRow, [1,2,3,4,5,6,7,8,9])
            && _.isEqual(flatCol, [1,2,3,4,5,6,7,8,9])
            && _.isEqual(flatBox, [1,2,3,4,5,6,7,8,9]);
    }

    render () {
        return <div>
            <h1>Sudoku</h1>
            <div className='grid-wrap'>
                <div className='win-overlay' style={{'display': this.state.complete ? 'block' : 'none'}}><h2>You win</h2></div>
                <Grid cells={this.state.cells} selectCell={this.selectCell} selectedCell={this.state.selectedCell} />
            </div>
            <Numpad press={this.press} />
        </div>
    }
}

render(<App />, document.getElementById('app'));
