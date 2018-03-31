import React from 'react';

class Numpad extends React.Component {
    press (key) {
        this.props.press(key);
    }

    render () {
        var numbers = [1,2,3,4,5,6,7,8,9];

        return <ul className='numpad'>
            {numbers.map((number, index) => {
                return <li
                    className={'numpad__key'}
                    key={index}
                    onClick={() => this.press(number)}>
                    <span className='numpad__number'>
                        {number}
                    </span>
                </li>
            })}
        </ul>
    }
}

module.exports = {
    Numpad: Numpad
}
