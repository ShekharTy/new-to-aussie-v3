import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';

function Homepage() {

    useEffect(() => {
        document.title = `New To Aussie - Slang Translator`;
    });

    return (
        <div className="flex flex-col min-h-screen">
                <Header />
                <div className="w-100 h-100 slang-learning select-none flex flex-col">
                        <div className="container slang-container mx-auto pt-9 pb-5 flex flex-col items-center">
                          <p className="text-5xl text-gray-600 font-bold mt-24">Aussie Slang Translator</p>
                        </div>
                    </div>
            <Footer />
        </div>
    );
}

export default Homepage;
