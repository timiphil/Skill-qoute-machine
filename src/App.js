import React, {useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is not measured by the number of breaths we take, but by the moments that take our breath away.");
  const [author, setAuthor] = useState("Maya Angelou");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
      const response = await fetch(url)
      const parseJSON = await response.json() 
      setQuotesArray(parseJSON.quotes)
      console.log(parseJSON)
  }

  useEffect(()=> {
    fetchQuotes(quoteDBUrl)
  }, [])

  const getRandomQuote = () => {
    let randInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randInteger)
    setAccentColor(COLORS_ARRAY[randInteger])
    setQuote(quotesArray[randInteger].quote)
    setAuthor(quotesArray[randInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <h1>Random Number: {randomNumber}</h1>
          <p id="text">
          "{quote}"
          </p>
          <p id="author">- {author}</p> 
          <div className="buttons">
            <a id="tweet-quote" style={{backgroundColor: accentColor}} href= {encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} />
            </a>
            <button id="new-quote" style={{backgroundColor: accentColor}} onClick={()=>getRandomQuote()}>Generate A Random Quote
            </button>
          </div> 
        </div>        
      </header>
    </div>
  );
}


export default App;
