/* imports */
import PropTypes from 'prop-types'
import React, { Component } from 'react'

/* CSS */
import './HighScoreInput.css'

/* Composant hallOfFame*/
import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
    state = {winner: ''}

    // Arrow(fonction flechée) fonction for binding 
    handleWinnerUpdate = event => {
        this.setState({winner: event.target.value.toUpperCase()})
    }
    // Arrow(fonction flechée) fonction for binding 
    persistWinner = event => {
        event.preventDefault()
        const newEntry = {guesses: this.props.guesses, player: this.state.winner}
        saveHOFEntry(newEntry, this.props.onStored)
    }
  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Bravo ! Entre ton prénom :
            <input type="text" onChange={this.handleWinnerUpdate} autoComplete="given-name"  value={this.state.winner}/>
          </label>
          <button type="submit">J’ai gagné !</button>
        </p>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
}

// Permet l'export du composant
export default HighScoreInput