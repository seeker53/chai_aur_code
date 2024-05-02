import React, { useState } from 'react'
import App from './App'


const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find((user) => user.username === username && user.password === password);
        if (userExists) {
            setIsLoggedIn(true);
            setUsername('')
            setPassword('')
        }
        else {
            alert("Invalid username or password")
        }
    };

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            alert('Username already exists. Please choose a different username.');
            return;
        }
        const newUser = { username, password };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        setIsLoggedIn(true);
        setUsername('')
        setPassword('')
        setIsRegistering(false)
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="max-w-md w-full bg-white p-8 rounded-lg">
                {isLoggedIn ? (
                    <div>
                        <App onLogout={handleLogout} />
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
                        <input
                            className="w-full mb-4 px-3 py-2 border rounded"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="w-full mb-4 px-3 py-2 border rounded"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isRegistering ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        )}
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            onClick={() => setIsRegistering(!isRegistering)}
                        >
                            {isRegistering ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Authentication;
