import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [followersData, setFollowersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFollowers, setFilteredFollowers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`https://api.github.com/users/${id}`);
      const data = await response.json();
      setUserData(data);
    };

    const fetchFollowersData = async () => {
      const response = await fetch(`https://api.github.com/users/${id}/followers`);
      const data = await response.json();
      setFollowersData(data);
    };

    fetchUserData();
    fetchFollowersData();
  }, [id]);

  useEffect(() => {
    const filterFollowers = () => {
      const searchTermLowercase = searchTerm.toLowerCase();
      const filteredFollowers = followersData.filter((follower) => {
        return (
          follower.login.toLowerCase().includes(searchTermLowercase) ||
          (follower.company && follower.company.toLowerCase().includes(searchTermLowercase))
        );
      });
      setFilteredFollowers(filteredFollowers);
    };

    filterFollowers();
  }, [searchTerm, followersData]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="user-details">
        <img src={userData.avatar_url} alt={userData.login} className="user-avatar" />
        <h3>{userData.name}</h3>
        <p><strong>Username:</strong> {userData.login}</p>
        <p><strong>Bio:</strong> {userData.bio}</p>
        <p><strong>Location:</strong> {userData.location}</p>
        <p><strong>URL:</strong> <a href={userData.url} target="_blank" rel="noopener noreferrer">{userData.url}</a></p>
        <p><strong>HTML URL:</strong> <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>

      </div>

      <h2>Followers</h2>
      <input className='input' type="search" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search followers..." />
      <div className="followers-list">
        {filteredFollowers.map((follower) => (
          <div key={follower.id} className="follower-card">
            <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
            <div className="follower-details">
              <h3>{follower.login}</h3>
               <p><strong>ID:</strong> {follower.id}</p>
              <p> {follower.node_id}</p>
              <p className="href"><a href={follower.gravatar_id} target="_self" rel="noopener noreferrer">Gravatar ID</a></p>
              <p className="href"><a href={follower.url} target="_self" rel="noopener noreferrer">URL</a></p>
              <p className="href"><a href={follower.html_url} target="_self" rel="noopener noreferrer">HTML URL</a></p>
              <p className="href"><a href={follower.followers_url} target="_self" rel="noopener noreferrer">Followers URL</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
