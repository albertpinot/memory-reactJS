/* Imports */
import React from 'react'
import PropTypes from 'prop-types'

/* CSS */
import './GuessCount.css'

const GuessCount = ({ guesses }) => (<div className="guesses">{guesses}</div>)

/* Définis la valeur par défaut d'une props
GuessCount.defaultProps = {
    guesses : 0,
}
*/
GuessCount.propTypes = {
    guesses: PropTypes.number.isRequired,
}

// Permet l'export du composant
export default GuessCount