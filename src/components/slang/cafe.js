import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import video from '../../data/cafe.mp4';
import '../../styles/cafe.css';

function VisitingCafe() {
    const [playing, setPlaying] = useState(false);  // Changed to false to prevent autoplay
    const [showOptions, setShowOptions] = useState(false);
    const [showDescription, setShowDescription] = useState(true);  // State to manage the display of the description
    const [completed, setCompleted] = useState(false);  // State to handle scenario completion

    const decisionPoints = [
        { time: 9, options: ['Not Too bad', 'I am doing good, Thanks.'], correct: 'Not Too bad', explanation: "Saying 'Not Too bad' is a laid-back and very typical way Australians express that they're doing well." },
        { time: 16.5, options: ['Can I have a "cuppa" please ?', 'I would like a coffee, please.'], correct: 'Can I have a "cuppa" please ?', explanation: "'Cuppa' is an endearing Australian term for a cup of tea or coffee." },
        { time: 24, options: ["I'll have a flat white, thanks.", 'Just a regular coffee, thanks.'], correct: "I'll have a flat white, thanks.", explanation: "Ordering a 'flat white' is quintessential in Australia, a coffee style that originated here." },
        { time: 32, options: ["Yeah, chuck in a couple of sugars, mate.", 'Yes, please, two sugars.'], correct: "Yeah, chuck in a couple of sugars, mate.", explanation: "The phrase 'chuck in' combined with 'mate' showcases familiar Aussie camaraderie and informality." }
    ];
    const [currentPoint, setCurrentPoint] = useState(0);

    const handleProgress = ({ playedSeconds }) => {
        const currentDecision = decisionPoints[currentPoint];
        if (playedSeconds > currentDecision.time && !showOptions) {
            setPlaying(false);
            setShowOptions(true);
        }
    };

    const handleOptionSelect = (option) => {
        const currentDecision = decisionPoints[currentPoint];
        if (option === currentDecision.correct) {
            if (currentPoint < decisionPoints.length - 1) {
                setCurrentPoint(currentPoint + 1);
            } else {
                setCompleted(true);  // Mark the scenario as completed when the last correct option is chosen
            }
            setShowOptions(false);
            setPlaying(true);
        } else {
            alert('Try again! Select the right Aussie slang.');
        }
    };


    const startVideo = () => {
        setShowDescription(false);
        setPlaying(true);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Going to Cafe</h1>
            <div className="video-container">
                {showDescription && (
                    <div className="description-overlay p-4 bg-white shadow rounded-lg">
                        <p>Welcome to the Aussie Slang Cafe Challenge! In this scenario, you'll need to use the correct Australian slang to order a coffee. Choose the right slang to see how the conversation unfolds. Ready to test your Aussie lingo?</p>
                        <button onClick={startVideo} className="start-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Start Challenge
                        </button>
                    </div>
                )}
                {completed ? (
                    <div className="congratulations bg-green-100 rounded-lg p-4 mt-4 shadow overflow-y-auto" style={{ maxHeight: '500px' }}>
                        <h2 className="text-2xl font-bold text-green-600">Congratulations on completing the scenario!</h2>
                        <p>Here's a breakdown of the Aussie slang you've successfully used:</p>
                        {decisionPoints.map((point, index) => (
                            <div key={index} className="mt-2 p-2">
                                <p><strong>{point.correct}:</strong> {point.explanation}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ReactPlayer
                        url={video}
                        playing={playing}
                        muted={false}
                        controls={false}
                        onProgress={handleProgress}
                        onStart={() => setPlaying(true)}
                        width="100%"
                        height="100%"
                    />
                )}
                {showOptions && (
                    <div className="options-overlay absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="options-content bg-white p-4 shadow rounded-lg">
                            <p className='text-black'>Choose the correct Aussie slang for the situation:</p>
                            {decisionPoints[currentPoint].options.map((option, index) => (
                                <button key={index} onClick={() => handleOptionSelect(option)} className="option-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VisitingCafe;
