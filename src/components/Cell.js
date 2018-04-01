import React from 'react';

class Cell extends React.Component {
    selectCell (cell) {
        this.props.selectCell(cell);
    }

    render () {
        var className = 'grid__cell';
        className += (this.props.selectedCell === this.props.cell.index) ? ' is-selected' : '';
        className += ' grid__cell--row-' + this.props.cell.row;
        className += ' grid__cell--col-' + this.props.cell.column;

        return <li
            className={className}
            onClick={() => this.selectCell(this.props.cell.index)}>
            <span className='grid__number'>
                {this.props.cell.value}
            </span>
        </li>
    }
}

module.exports = {
    Cell: Cell
}
