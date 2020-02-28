/* Imports */
import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

/* CSS */
import './App.css'

/* Composants */
import GuessCount from './GuessCount'
import Card from './Card'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'

// Nombre de cartes par ligne 
const SIDE = 6
// Cartes
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
    /* Etat locale*/
    state = {
        cards: this.generateCards(),
        currentPair: [],
        guesses: 0,
        hallOfFame: null,
        matchedCardIndices: [],
    }
  // Arrow fonction for binding
  displayHallOfFame = hallOfFame => {
    this.setState({ hallOfFame })
  }
  //constructor(props){
      //super(props);
      /* c'est le bind Permet de garder en mémoire le this de la fonction handlecardclick, inconvéniants sauf qu'il est loin de la définiton de la méthode */
      //this.handleCardClick = this.handleCardClick.bind(this);
  //}
  /* Genère la tableu de memory */
  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result)
  }
    /*binding Permet de garder en mémoire le this de la fonction handlecardclick, inconvéniants sauf que pas tres claire mettre commentaire pour s'y retrouver*/
  // Arrow fx for binding
    handleCardClick = index => {
    const { currentPair } = this.state
  
    if (currentPair.length === 2) {
      return
    }
  
    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] })
      return
    }
  
    this.handleNewPairClosedBy(index)
  }

  /*handleCardClick(card) {
    console.log(card, 'clicked',this);
  }*/
  /* Rustine pour laisser le this dans la methode handlecardclick*/
  //onClick={(card) => this.handleCardClick(card)}

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

    handleNewPairClosedBy(index) {
      const { cards, currentPair, guesses, matchedCardIndices } = this.state
  
      const newPair = [currentPair[0], index]
      const newGuesses = guesses + 1
      const matched = cards[newPair[0]] === cards[newPair[1]]
      this.setState({ currentPair: newPair, guesses: newGuesses })
      if (matched) {
        this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
      }
      setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
    }

  render() {
    //Destructuration
    const {cards, guesses, hallOfFame, matchedCardIndices} = this.state
    const won = matchedCardIndices.length === cards.length
    return (
      <div className="memory">
        <h1 className="memory-title">Jeu de memory</h1>
        <GuessCount  guesses={guesses}/>
        {cards.map((card,index) => (
            <Card card={card} feedback={this.getFeedbackForCard(index)} key={index} index={index} onClick={this.handleCardClick} />
        ))}
        {won && ( 
        hallOfFame ? (<HallOfFame entries={hallOfFame} /> ) : (<HighScoreInput guesses={guesses} onStored={this.displayHallOfFame}/>)
        )}
      </div>
    )
  }
}

// Permet l'export de l'application
export default App