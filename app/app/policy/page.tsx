import localFont from "next/font/local";
import { Poppins } from 'next/font/google';
import Link from "next/link";

const headingFont = localFont({
    src: "../../public/fonts/CalSans-SemiBold.woff2"
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

function TermsAndConditions() {
    return (
        <div className={`min-h-screen max-h-screen text-white ${textFont.className}`} style={{overflow:'auto'}}>
            <div className="max-w-4xl mx-auto p-10">
                <div className="flex flex-row gap-5">
                    <Link href="/" aria-label="Back to homepage" className="cursor:pointer ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12L11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                    <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${headingFont.className} flex`}>
                        Terms and Conditions
                    </h1>
                </div>

                <p className="mb-4 text-sm">
                    Welcome to OmeLive, an Omegle clone that allows you to engage in random chats with strangers. Our service is peer-to-peer (P2P), and we do not store any chats or personal data on our signaling server.
                </p>

                <p className="mb-4 text-sm">
                    OmeLive uses WebRTC for peer-to-peer connections, ensuring that your chats remain private and secure. No SFU (Selective Forwarding Unit) or server is involved in the communication process beyond the initial signaling and exchange of connection offers.
                </p>

                <p className="mb-4 text-sm">
                    In most cases, WebRTC connections are established using STUN (Session Traversal Utilities for NAT) servers, which help in resolving network address translation (NAT) issues. However, in cases where STUN servers are unable to establish a connection due to restrictive NAT or firewall settings, we use TURN (Traversal Using Relays around NAT) servers as a fallback. TURN servers relay media traffic between peers, ensuring a connection can still be established even when direct peer-to-peer communication is not possible.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4 text-sm">
                    By using OmeLive, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use our service.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">2. Description of Service</h2>
                <p className="mb-4 text-sm">
                    OmeLive connects users randomly for anonymous chats. The connections are peer-to-peer, meaning no data is stored on our servers. We act solely as a signaling server to facilitate the initial connection.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">3. Privacy Policy</h2>
                <p className="mb-4 text-sm">
                    We respect your privacy. As all chats are P2P, we do not have access to, nor do we store, any chat logs or personal information. The signaling server only handles the initial connection setup and does not retain any data.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">4. User Conduct</h2>
                <p className="mb-4 text-sm">
                    You agree to use OmeLive responsibly and ethically. You must not use the service for any unlawful activities, harassment, or sharing of inappropriate content. We reserve the right to terminate your access to the service if you violate these terms.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">5. Disclaimer of Warranties</h2>
                <p className="mb-4 text-sm">
                    OmeLive is provided on an "as is" and "as available" basis. We do not guarantee that the service will be uninterrupted, secure, or error-free. Use of the service is at your own risk.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">6. Limitation of Liability</h2>
                <p className="mb-4 text-sm">
                    In no event shall OmeLive, its developers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">7. Changes to Terms</h2>
                <p className="mb-4 text-sm">
                    We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the service constitutes acceptance of the modified terms.
                </p>

                <h2 className="text-2xl md:text-xl font-bold mb-4">8. Contact Us</h2>
                <p className="mb-4 text-sm">
                    If you have any questions or concerns about these terms and conditions, please contact us at GitHub.
                </p>
            </div>
        </div>
    );
}

export default TermsAndConditions;
