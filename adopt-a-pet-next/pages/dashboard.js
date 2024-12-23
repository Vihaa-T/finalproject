import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/loginpage'); // Redirect to login if no token is found
    } else {
      // Fetch user data from an API or use the token to get user info
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data); // Set the user data if successful
      } else {
        setError(data.message); // Set error if something goes wrong
        router.push('/loginpage'); // Redirect to login if error occurs
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch user data');
      router.push('/loginpage'); // Redirect to login in case of error
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h1>Welcome, {userData.name}</h1>
          <p>Email: {userData.email}</p>
          {/* You can add other user data here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
