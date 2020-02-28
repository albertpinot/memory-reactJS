/* imports */
import React from 'react'
import PropTypes from 'prop-types'

/* CSS */
import './Card.css'

// Face cachée 
const HIDDEN_SYMBOL = '❓'

const Card = ({card, feedback, index, onClick}) => (
<div className={`card ${feedback}`} onClick={() => onClick(index)}>
    <span className="symbol">
        {feedback === 'hidden' ? HIDDEN_SYMBOL : card} 
    </span>
</div>
)
Card.propTypes = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'visible',
        'hidden',
        'justMatched',
        'justMismatched',

    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

// Permet l'export du composant
export default Card