import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import video from '../../data/visit-beach.mp4';
import '../../styles/visit-friend.css';

function VisitingBeach() {
    const [playing, setPlaying] = useState(false);  // Control autoplay
    const [showOptions, setShowOptions] = useState(false);
    const [showDescription, setShowDescription] = useState(true);
    const [completed, setCompleted] = useState(false);

    const decisionPoints = [
        { time: 15, options: ['Too right! Keen as mustard to get in the surf.', 'Yes, I’ve been looking forward to the beach all day.'], correct: 'Too right! Keen as mustard to get in the surf.', explanation: "Using 'Too right' and 'Keen as mustard' shows a high level of enthusiasm, common in Aussie slang." },
        { time: 26.5, options: ['I’ll snag this beaut. Looks like a good stick!', 'I’ll take this one. It looks good.'], correct: 'I’ll snag this beaut. Looks like a good stick!', explanation: "Referring to a surfboard as a 'beaut' and a 'good stick' captures the local colloquial tone." },
        { time: 48.5, options: ['I’m peckish. Got any sangers?', 'I could eat. What do we have?'], correct: 'I’m peckish. Got any sangers?', explanation: "'Peckish' and 'sangers' are very Aussie ways of saying you're slightly hungry and interested in sandwiches." },
        { time: 56, options: ['Oh! Cheers Mate. You are a life saver.', 'Great. Thanks for bringing the sandwiches'], correct: 'Oh! Cheers Mate. You are a life saver.', explanation: "Opting for a direct challenge with 'You’re on!' and immediately asking about bowling reflects the informal Aussie style of communication." },
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
                setCompleted(true);
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
            <h1 className="text-2xl font-bold mb-4">Day out at the Beach</h1>
            <div className="video-container">
                {showDescription && (
                    <div className="description-overlay">
                        <p>Join our Aussie Slang Challenge on the Beach! Use the right slang to blend in and enjoy a sunny day with local mates.</p>
                        <button onClick={startVideo} className="start-button">
                            Start Challenge
                        </button>
                    </div>
                )}
                {completed ? (
                    <div className="congratulations bg-green-100 rounded-lg p-4 mt-4 shadow overflow-y-auto" style={{ maxHeight: '500px' }}>
                        <h2 className="text-2xl font-bold text-green-600">Well done, you've aced it!</h2>
                        <p>You've mastered these Aussie slang terms:</p>
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
                        controls={true}
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

export default VisitingBeach;
