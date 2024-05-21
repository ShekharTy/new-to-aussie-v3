import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';

function SlangTranslator() {

    useEffect(() => {
        document.title = `New To Aussie - Slang Translator`;
    });

    const handleBotClick = () => {
        window.location.href = "https://t.me/MyIMtestbot";
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="w-100 h-100 slang-learning select-none flex flex-col">
                <div className="container slang-container mx-auto pt-9 pb-5 flex flex-col items-center">
                    <p className="text-4xl text-gray-600 font-bold mt-24">OZLINGO - Aussie Slang Translator</p>
                    <p className=" text-gray-700">Unleash the true spirit of Australia with OZLINGO</p>
                    <p className=" text-gray-700">Your ultimate Aussie slang translator bot!</p>
                    <p className=" text-gray-700">Start your Aussie adventure today with OZLINGO!</p>
                    <p className=" text-gray-700">Simply join our Telegram bot and unlock the rich tapestry of Australian culture one slang word at a time.</p>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleBotClick}>
                        Try OZLINGO Bot
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SlangTranslator;
