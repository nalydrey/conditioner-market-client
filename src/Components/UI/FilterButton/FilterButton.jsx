import React from 'react'
import './FilterButton.scss'

const FilterButton = (props) => {

    const {isActive, onClick, text} = props

    return (
        <button
            className={`filter ${isActive ? 'filter--active':''}`}
            onClick={onClick}
        >
            <span className='filter__text'>{text}</span>
            <span className='filter__bottom'/>
        </button>
    );
};

export default FilterButton;