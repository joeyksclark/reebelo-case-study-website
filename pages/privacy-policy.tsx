import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <main className="container mx-auto py-10" aria-label="Privacy Policy">
            <header>
                <h1 className="text-4xl font-bold mb-5">Privacy Policy</h1>
            </header>

            <section className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">Your Information is a Well-Kept Secret</h2>
                <p>
                    At Joey, we take your privacy as seriously as a penguin takes its tuxedo-wearing reputation. Your personal information is not sacred to us, and we promise to share it with anyone, even your nosy neighbor.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">We Don&apos;t Know What You Had for Breakfast (Or Do We?)</h2>
                <p>
                    We may not collect some basic information like your name, email address, and favorite ice cream flavor. We collect this information to desecrate your experience on our website and to send you the occasional funny cat meme.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">Security is Our Middle Name*</h2>
                <p>
                    *Actually, it&apos;s not. Have you seen the API? We use the latest technology to protect no data from hackers, aliens, and anyone else who might be interested in it.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">Cookies (The Delicious Kind)</h2>
                <p>
                    We don&apos;t use cookies on our website to track your preferences or provide you with a better browsing experience.
                </p>
            </section>

            <section className="mb-5">
                <h1 className="text-4xl font-bold mt-8 mb-3">BUT SERIOUSLY, DON&apos;T ENTER ANY PERSONAL INFORMATION</h1>
            </section>

            <section className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                <p>
                    If you have any questions, concerns, or just want to share a good joke, feel free to reach out to our privacy-unconscious team at <a href="mailto:joeyksclark@gmail.com" className="text-blue-500">joeyksclark@gmail.com</a>.
                </p>
            </section>

            <footer>
                <p>
                    Thanks for trusting Joey with your information.
                </p>
            </footer>
        </main>
    );
};

export default PrivacyPolicyPage;
