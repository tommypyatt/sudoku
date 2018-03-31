import React from 'react';

class Grid extends React.Component {
    constructor (props) {
        super(props);
    }

    selectCell (cell) {
        this.props.selectCell(cell);
    }

    render () {
        return <ul className='grid'>
            {this.props.cells.map((cell, index) => {
                var className = 'grid__cell grid__cell--';
                className += index % 9;
                className += ' grid__cell--row-' + Math.floor(index / 9);
                className += this.props.selectedCell === index ? ' is-selected' : '';

                return <li
                    className={className}
                    key={index}
                    onClick={() => this.selectCell(index)}>
                    <span className='grid__number'>
                        {this.props.cells[index]}
                    </span>
                </li>
            })}
        </ul>
    }
}

module.exports = {
    Grid: Grid
}
