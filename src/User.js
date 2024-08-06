import React from 'react';

const User = ({ user, onClick }) => (
  <div>
    <img src={user.avatar_url} alt={user.login} onClick={onClick} />
    <p>Login: {user.login}</p>
    <p>ID: {user.id}</p>
    <p>Node ID: {user.node_id}</p>
    <p>Gravatar ID: {user.gravatar_id}</p>
    <p>URL: {user.url}</p>
    <p>HTML URL: {user.html_url}</p>
    <p>Followers URL: {user.followers_url}</p>
    <p>Following URL: {user.following_url}</p>
    <p>Gists URL: {user.gists_url}</p>
    <p>Starred URL: {user.starred_url}</p>
  </div>
);

export default User;