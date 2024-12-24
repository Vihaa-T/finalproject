import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  // State to store user data fetched from the API
  const [userData, setUserData] = useState(null);
  // State to handle errors that may occur during data fetching
  const [error, setError] = useState(null);
  // Router object to handle navigation
  const router = useRouter();

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token is found, redirect the user to the login page
      router.push('/loginpage'); // Redirect to login if no token is found
    } else {
      // If a token exists, attempt to fetch user data using the token
      fetchUserData(token);
    }
  }, []); // Dependency array is empty to ensure this runs only once on component mount
  /**
   * Fetches user data from the server using the provided token.
   * @param {string} token - The authentication token from localStorage.
   */
  const fetchUserData = async (token) => {
    try {
      // Make an API request to fetch user information
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token as a Bearer token in the Authorization header
        },
      });
      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        // If the response is successful, set the user data in state
        setUserData(data); // Set the user data if successful
      } else {
        // If the response is not successful, set an error message and redirect to login
        setError(data.message); // Set error if something goes wrong
        router.push('/loginpage'); // Redirect to login if error occurs
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error(error);
      setError('Failed to fetch user data');// Set a generic error message
      router.push('/loginpage'); // Redirect to login in case of failure
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
