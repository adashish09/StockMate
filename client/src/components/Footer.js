// client/src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <p className="mb-1">&copy; {new Date().getFullYear()} <strong>StockMate</strong>. All rights reserved.</p>
                <small>
                    Developed with ❤️ by Ashish |{" "}
                    <a
                        href="https://github.com/adashish09"
                        target="_blank"
                        rel="noreferrer"
                        className="text-info"
                    >
                        GitHub
                    </a>
                </small>
            </div>
        </footer>
    );
};

export default Footer;
