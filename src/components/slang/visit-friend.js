import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import video from '../../data/visit.mp4';
import '../../styles/visit-friend.css';

function VisitingFriendsHouse() {
    const [playing, setPlaying] = useState(false);  // Disable autoplay
    const [showOptions, setShowOptions] = useState(false);
    const [showDescription, setShowDescription] = useState(true);  // Manage display of the description
    const [completed, setCompleted] = useState(false);  // Manage when the scenario is completed

    const decisionPoints = [
        { time: 11.5, options: ['Cheers for the invite! Keen to have a good time', 'Thanks for inviting me!'], correct: 'Cheers for the invite! Keen to have a good time', explanation: "Saying 'Cheers for the invite!' with 'Keen to have a good time' fits perfectly into the informal and friendly Australian way of expressing enthusiasm." },
        { time: 19, options: ['A coldie would be great.', 'I would like a soda, please.'], correct: 'A coldie would be great.', explanation: "'A coldie' is a slang term for a cold beer, commonly used across Australia especially in casual social gatherings." },
        { time: 26.5, options: ['You firing up the barbie for tonight?', 'What are we going to do for food?'], correct: 'You firing up the barbie for tonight?', explanation: "Asking if someone is 'firing up the barbie' is a very Aussie way of asking about cooking on a barbecue, a popular method of cooking in Australia, especially at gatherings." },
        { time: 36, options: ["Yeah mate, I can't wait to get some tucker", 'I am very hungry, thanks.'], correct: "Yeah mate, I can't wait to get some tucker", explanation: "'Tucker' is a colloquial term for food, and saying 'Yeah mate' adds a touch of Aussie camaraderie." },
        { time: 45, options: ['Fair dinkum, it was a ripper of an evening! Thanks heaps! See ya later mate', 'Thank you, it was a great evening!'], correct: 'Fair dinkum, it was a ripper of an evening! Thanks heaps! See ya later mate', explanation: "'Fair dinkum' and 'ripper' are terms of enthusiasm and authenticity in Australian slang, perfect for expressing enjoyment of an event." }
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
            <h1 className="text-2xl font-bold mb-4">Visiting Friend's House</h1>
            <div className="video-container">
                {showDescription && (
                    <div className="description-overlay">
                        <p>Welcome to the Aussie Slang Challenge at a Friend's House! Here you'll need to navigate a social gathering using the correct Australian slang. Ready to dive into some local lingo?</p>
                        <button onClick={startVideo} className="start-button">
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
                    <div className="options-overlay">
                        <div className="options-content">
                            <p>Choose the correct Aussie slang for the situation:</p>
                            {decisionPoints[currentPoint].options.map((option, index) => (
                                <button key={index} onClick={() => handleOptionSelect(option)} className="option-button">
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

export default VisitingFriendsHouse;
