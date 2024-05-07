import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Header from './header';
import Footer from './footer';

function SlangLearning() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [slangs, setSlangs] = useState([]);

  // Function to load and parse the CSV data only once
  useEffect(() => {
    console.log("Loading CSV data...");
    Papa.parse('/data/aussie_slang.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log("Parsed data:", results.data);
        const filteredEntries = results.data.filter(entry => Object.values(entry).some(x => x)); // Additional check to filter out empty rows
        const mappedSlangs = filteredEntries.map(slang => ({
          slang: slang["Aussie slang"]?.trim(),
          meaning: slang["Meaning"]?.trim(),
          usage: slang["Usage"]?.trim()
        }));
        setSlangs(mappedSlangs);
      }
    });
  }, []); // Ensure this runs only once by setting an empty dependency array

  // Function to search the slang or its meaning
  const searchSlang = () => {
    const filtered = slangs.filter(slang =>
      slang.slang.toLowerCase().includes(term.toLowerCase()) ||
      slang.meaning.toLowerCase().includes(term.toLowerCase())
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
          onChange={(e) => setTerm(e.target.value.trim())}
          placeholder="Enter Aussie slang or English meaning"
        />
        <button onClick={searchSlang}>Search</button>
        <div>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index}>
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
    </div>
  );  
}

export default Slang
