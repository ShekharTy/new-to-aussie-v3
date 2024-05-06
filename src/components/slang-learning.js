import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Header from './header';
import Footer from './footer';

function SlangLearning() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [slangs, setSlangs] = useState([]);

  // Function to load and parse the CSV data
  useEffect(() => {
    Papa.parse('/data/aussie_slang.csv', {
      download: true,
      header: true,
      complete: function(results) {
        setSlangs(results.data);
      }
    });
  }, []);

  // Function to search the slang or its meaning
  const searchSlang = () => {
    const filtered = slangs.filter(slang =>
      slang['Aussie slang'].toLowerCase().includes(term.toLowerCase()) ||
      slang['Meaning'].toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div>
      <Header />
      <div className="slang-search-container">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter Aussie slang or English meaning"
        />
        <button onClick={searchSlang}>Search</button>
        <div>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index}>
                <strong>Slang:</strong> {result['Aussie slang']}<br />
                <strong>Meaning:</strong> {result.Meaning}<br />
                <strong>Usage:</strong> {result.Usage}
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SlangLearning;