import React, { useState } from 'react';
import WhiteLogo from 'D:/WEBDEV/React/one stop/src/assest/White_Logo.png';
import { useNavigate, Link } from 'react-router-dom'; // Import for navigation

// --- Firebase Imports (from NPM) ---
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// --- Firebase Initialization ---
// 1. Keys are now securely loaded from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbref = ref(db);
// --- End of Firebase Setup ---


const Login = () => {
    // --- State Management ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Use the 'useNavigate' hook from react-router-dom
    const navigate = useNavigate();

    // --- Event Handler ---
    const handleLogin = async (evt) => {
        evt.preventDefault(); // Prevent form submission

        // 3. Simple form validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setIsLoading(true); // 4. Set loading state
        setError(null);     // Clear previous errors

        try {
            // 5. Use async/await for cleaner logic
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const snapshot = await get(child(dbref, 'UsersAuthList/' + userCredential.user.uid));

            if (snapshot.exists()) {
                // 6. Save to session storage (using Context API is better long-term)
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname: snapshot.val().firstname,
                    lastname: snapshot.val().lastname
                }));
                sessionStorage.setItem("user-creds", JSON.stringify(userCredential.user));

                // 7. Navigate the "React way" to the home page
                navigate('/home');
            } else {
                console.log("No user data available in database.");
                setError("Login successful, but no user profile data was found.");
            }

        } catch (error) {
            // 8. Set a user-friendly error message
            console.error(error.code, error.message);
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('An error occurred during login. Please try again later.');
            }
        } finally {
            // 9. Stop loading state regardless of success or failure
            setIsLoading(false);
        }
    };

    // Use font-tektur from tailwind.config.js
    return (
        <div className="font-tektur bg-gradient-to-r from-[#F3EDCE] via-[#FFE75C] to-[#F57A00] min-h-screen flex items-center justify-center">
            <div className="relative w-[45vw] h-[330px]
                            lg:w-[60vw] 
                            md:w-[75vw] 
                            sm:w-[90vw]
                            max-sm:w-[90vw] max-sm:h-auto max-sm:my-[25%]">

                {/* Box 1 (Main Content Box) */}
                {/* 10. Converted to a <form> for accessibility and 'onSubmit' */}
                <form
                    onSubmit={handleLogin}
                    className="relative z-10 h-full bg-white shadow-lg rounded-lg
                                flex justify-center items-center
                                max-sm:flex-col max-sm:h-auto max-sm:py-8"
                >

                    {/* Left Side: Welcome Text */}
                    <div className="w-2/5 flex flex-col items-center justify-evenly gap-5 bg-white p-6 m-6 
                                    border-r border-black
                                    max-sm:w-[90%] max-sm:border-r-0 max-sm:border-b max-sm:m-6">
                        <img src={WhiteLogo} alt="One Stop Movie" className="w-24" /> {/* Use Tailwind size */}
                        <div className="text-center text-[46px] font-bold max-sm:hidden">
                            Welcome!
                        </div>
                        <div className="text-center text-sm font-light max-sm:hidden">
                            Enter Your Email and Password
                        </div>
                    </div>

                    {/* Right Side: Login Form */}
                    <div className="w-3/5 flex flex-col items-center justify-center gap-5
                                    max-sm:w-full max-sm:px-4">
                        <div className="text-center text-4xl font-medium">
                            Login Here!
                        </div>

                        {/* 11. User-friendly error message */}
                        {error && (
                            <div className="text-red-600 bg-red-100 p-2 rounded-md text-sm w-[150%] text-center">
                                {error}
                            </div>
                        )}

                        {/* Form Inputs */}
                        <div className="text-center flex flex-col justify-center items-center gap-2.5">
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[150%] border-0 border-b-2 border-[#fca311] p-1.5 text-xs focus:outline-none focus:ring-0"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[150%] border-0 border-b-2 border-[#fca311] p-1.5 text-xs focus:outline-none focus:ring-0"
                            />
                        </div>

                        {/* Form Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-[50px] scale-125 mt-4">
                            <button
                                type="submit" // Changed to 'submit'
                                disabled={isLoading} // 12. Disable button when loading
                                className="bg-[#fca311] text-white py-1 px-4 border-none
                                           hover:bg-[#F57A00] 
                                           focus:bg-[#F57A00] focus:rounded-lg
                                           disabled:bg-gray-400 disabled:cursor-not-allowed" // 13. Style for disabled state
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>

                            {/* 14. Use <Link> for navigation, not a button */}
                            <Link
                                to="/signup"
                                className="text-sm text-center bg-[#fca311] text-white py-1 px-4 border-none
                                           hover:bg-[#F57A00] 
                                           focus:bg-[#F57A00] focus:rounded-lg"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>

                {/* Box 2 (Decorative) - Hidden on small screens */}
                <div className="absolute z-[2] h-full w-full top-[-180px] bg-[#fca311] shadow-[0px_0px_40px_5px_black]
                                max-sm:hidden">
                </div>

                {/* Box 3 (Decorative) - Use custom utility from config */}
                <div className="absolute z-0 h-full w-full top-[-840px] bg-[#fca311] shadow-[0px_0px_40px_5px_black]
                                clip-triangle-bottom
                                max-sm:hidden">
                </div>

            </div>
        </div>
    );
}

export default Login;