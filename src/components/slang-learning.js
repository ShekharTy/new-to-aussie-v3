import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import slangData from '../data/aussie_slang.json';

function SlangLearning() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [slangs] = useState(slangData.map(slang => ({
    slang: slang.slang.trim(),
    meaning: slang.meaning.trim(),
    usage: slang.usage.trim()
  })));

  const searchSlang = () => {
    const filtered = slangs.filter(slang =>
      slang.slang.toLowerCase().includes(term.toLowerCase()) ||
      slang.meaning.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <>
      <Header />
      <div className="slang-search-container">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter Aussie slang or English meaning"
        />
        <button type="button" onClick={searchSlang}>Search</button>
        <div>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={result.slang + index}>
                <strong>Slang:</strong> {result.slang}<br />
                <strong>Meaning:</strong> {result.meaning}<br />
                <strong>Usage:</strong> {result.usage}
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );  
}

export default SlangLearning;


