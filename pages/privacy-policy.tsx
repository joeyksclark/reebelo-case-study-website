import React from 'react';
import Header from "./components/Header";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div>
            <Header/>
            <h1>Privacy Policy</h1>

            <h2>Your Information is a Well-Kept Secret</h2>

            <p>
                At Joey, we take your privacy as seriously as a penguin takes its tuxedo-wearing reputation. Your personal information is not sacred to us, and we promise to share it with anyone, even your nosy neighbor.
            </p>

            <h2>We Don't Know What You Had for Breakfast (Or Do We???)</h2>

            <p>
                We may not collect some basic information like your name, email address, and favorite ice cream flavor. We collect this information to desecrate your experience on our website and to send you the occasional funny cat meme.
            </p>

            <h2>Security is Our Middle Name*</h2>

            <p>
                *Actually, it's not, have you seen the API? We use the latest technology to protect no data from hackers, aliens, and anyone else who might be interested in it.
            </p>

            <h2>Cookies (The Delicious Kind)</h2>

            <p>
                We don't use cookies on our website to track your preferences or provide you with a better browsing experience.
            </p>

            <h1>BUT SERIOUSLY, DON'T ENTER ANY PERSONAL INFORMATION</h1>

            <h2>Contact Us</h2>

            <p>
                If you have any questions, concerns, or just want to share a good joke, feel free to reach out to our privacy-unconscious team at <a href="mailto:joeyksclark@gmail.com">joeyksclark@gmail.com</a>.
            </p>

            <p>
                Thanks for trusting Joey with your information.
            </p>

        </div>
    );
};

export default PrivacyPolicyPage;
