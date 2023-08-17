import React, { useState } from 'react';
import './App.css';

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  message: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const response = await fetch(`https://api.github.com/users/${username}`);
        const data: UserData = await response.json();
        setUserData(data);
    } catch (error) {
      setError('Error fetching data');
    }
  };
  
  return (
    <div className="App">
      <h1>Github User Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {userData?.message && <p className="error">{'User ' + userData?.message}</p>}
      {error && <p className="error">{error}</p>}
      {userData?.id && (
        <div className="user-info">
          <img src={userData?.avatar_url} alt={`${username}'s avatar`} />
          <h2>{userData?.login}</h2>
          <p>{userData?.bio}</p>
          <a href={userData?.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
