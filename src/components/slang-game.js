import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import VisitingFriendsHouse from './slang/visit-friend';
import Cafe from './slang/cafe';
import VisitingBeach from './slang/visit-beach';
import '../styles/slang-game.css';

function SlangGame() {
    const [activeScenario, setActiveScenario] = useState(null);
    useEffect(() => {
        document.title = `New To Aussie - Slang Scenario`;
    });
    const scenarios = [
        { id: 1, title: "Going to a Cafe", component: Cafe },
        { id: 2, title: "Visiting a friends house", component: VisitingFriendsHouse },
        { id: 3, title: "Day out at the Beach" , component: VisitingBeach} 
    ];

    const handleScenarioClick = (scenarioId) => {
        setActiveScenario(scenarioId);
    };

    const handleBackClick = () => {
        setActiveScenario(null); // Reset active scenario to show the selection menu
    };

    const renderScenarioComponent = () => {
        const scenario = scenarios.find(s => s.id === activeScenario);
        if (scenario && scenario.component) {
            const ScenarioComponent = scenario.component;
            return (
                <div>
                    <ScenarioComponent />
                    <button onClick={handleBackClick} className="mt-4 mb-2 p-2 bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
                        Back to Scenarios
                    </button>
                </div>
            );
        }
        return null; // Return null to not render anything if no scenario is active
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            {activeScenario ? (
                <div className='flex flex-col justify-center items-center p-4'>
                    {renderScenarioComponent()}
                </div>
            ) : (
                <div className="flex-grow bg-gray-100">
                    <div className="w-100 h-100 slang-learning select-none flex flex-col">
                        <div className="container slang-container mx-auto pt-9 pb-5 flex flex-col items-center">
                          <p className="text-5xl text-gray-600 font-bold mt-24">Aussie Slang Scenario</p>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 p-4">Choose a Slang Scenario:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                   
                        {scenarios.map((scenario) => (
                            <button
                                key={scenario.id}
                                className={`p-4 text-xl text-white font-semibold rounded-lg hover:bg-blue-400 shadow-md ${activeScenario === scenario.id ? 'bg-blue-600' : 'bg-blue-500'}`}
                                onClick={() => handleScenarioClick(scenario.id)}
                            >
                                {scenario.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <Footer className="w-full" />
        </div>
    );
}

export default SlangGame;
