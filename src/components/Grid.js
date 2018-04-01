import React from 'react';
import { Cell } from './Cell';

class Grid extends React.Component {
    render () {
        return <ul className='grid'>
            {this.props.cells.map((cell, index) => {
                return <Cell
                    key={index}
                    cell={cell}
                    selectCell={this.props.selectCell}
                    selectedCell={this.props.selectedCell} />
            })}
        </ul>
    }
}

module.exports = {
    Grid: Grid
}
