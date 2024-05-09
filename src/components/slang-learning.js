import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import slangData from "../data/aussie_slang.json";
import "../styles/slang-learning.css";

const slangs = slangData.map((slang) => ({
  slang: slang.slang.trim(),
  meaning: slang.meaning.trim(),
  usage: slang.usage.trim(),
}));

const selectedSlangs = slangs.filter(() => Math.random() < 3 / slangs.length);

function SlangLearning() {
  const [term, setTerm] = useState("");

  const filtered = slangs.filter(
    (slang) =>
      slang.slang.toLowerCase().includes(term.toLowerCase()) ||
      slang.meaning.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="w-100 h-100 slang-learning select-none flex flex-col">
        <div className="container slang-container mx-auto pt-9 pb-5 flex flex-col items-center">
          <p className="text-4xl text-gray-600 font-bold">Slang Search</p>
          <input
            className="slang-input"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter Aussie slang or English meaning"
            autoFocus
          />
          <div className="slang-promote">
            {selectedSlangs.map((item) => {
              return (
                <span
                  key={item.slang}
                  onClick={() => setTerm(item.slang)}
                  className="text-blue-600 visited:text-purple-600 text-underline"
                >
                  {item.slang}
                </span>
              );
            })}
          </div>
          <div className="container py-10 max-w-full flex flex-wrap justify-center">
            {term !== "" ? (
              filtered.map((result, index) => (
                <div
                  key={result.slang + index}
                  class="bg-white mx-2 my-3 w-64 rounded overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div class="px-6 py-4">
                    <div class="font-bold text-3xl mb-2 text-gray-700">
                      {result.slang}
                    </div>
                    <p class="text-base">{result.meaning}</p>
                  </div>
                  <div class="px-6 pt-0 py-4">
                    <p class="text-sm text-gray-700">{result.usage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SlangLearning;
