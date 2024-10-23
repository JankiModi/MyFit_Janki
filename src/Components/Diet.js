import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Diet() {
    const bmi = localStorage.getItem('bmi');
    const bmr = localStorage.getItem('bmr');
    const calories = localStorage.getItem('calories');
    const [user, setData] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('access_token');
            const name = localStorage.getItem('username');
            const email = localStorage.getItem('email');
            const isPremiumUser = localStorage.getItem('isPremiumUser');
            setUsername(name);

            if (token && name) {
                setData({ username: name, email, isPremiumUser });
                setIsAuthenticated(true);
                console.log(isPremiumUser)
                // Check if user is premium and redirect accordingly
                if (isPremiumUser === 'true') {
                    navigate('/predict');
                } else {
                    navigate('/payment');
                }
            } else {
                setIsAuthenticated(false);
            }
            setHasCheckedAuth(true);
        };
        checkAuthentication();
    }, [navigate]);

    useEffect(() => {
        if (hasCheckedAuth && !isAuthenticated) {
            showLoginAlert();
        }
    }, [hasCheckedAuth, isAuthenticated, navigate]);

    const showLoginAlert = () => {
        const shouldLogin = window.confirm("You need to login to use this functionality. Would you like to go to the login page?");
        if (shouldLogin) {
            navigate('/login');
        } else {
            navigate('/home');
        }
    };

    if (!hasCheckedAuth) {
        return <div>Loading...</div>;
    }

    // If not authenticated, don't render anything
    if (!isAuthenticated) {
        return null;
    }

    // This return statement will likely never be reached due to the redirects
    return (
        <>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <h1 style={{ color: 'white' }}>Diet</h1>
        </>
    );
}