import React from 'react';
import _ from 'lodash';
import { render } from 'react-dom';
import { Grid } from './components/Grid';
import { Numpad } from './components/Numpad';

class App extends React.Component {
    constructor (props) {
        var i = 0;
        var values = [null,null,5,2,6,9,7,8,1,6,8,2,5,7,1,4,9,3,1,9,7,8,3,4,5,6,2,8,2,6,1,9,5,3,4,7,3,7,4,6,8,2,9,1,5,9,5,1,7,4,3,6,2,8,5,1,9,3,2,6,8,7,4,2,4,8,9,5,7,1,3,6,7,6,3,4,1,8,2,5,9]
        var cells = [];

        for (;i < 81;i++) {
            let row = Math.floor(i / 9);
            let column = i % 9;
            let box = (Math.floor(row / 3) * 3) + Math.floor(column / 3);

            cells.push({
                index: i,
                value: values[i],
                row: row,
                column: column,
                box: box
            });
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
        var selectedCell = this.state.selectedCell;
        var index = _.findIndex(this.state.cells, function (cell) {
            return cell.index === selectedCell
        });

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
            alert('YOU WIN');
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
            <Grid cells={this.state.cells} selectCell={this.selectCell} selectedCell={this.state.selectedCell} />
            <Numpad press={this.press} />
        </div>
    }
}

render(<App />, document.getElementById('app'));
