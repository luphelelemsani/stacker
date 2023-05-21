import React, { useState, useEffect } from 'react';
import { User } from '../../store/reducers/users-reducer';

interface UserProfileProps {
  user: User | null;
  fetchUser: () => Promise<User>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, fetchUser }) => {
    
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!user) {
      setIsFetching(true);
      fetchUser()
        .then((userData) => {
          user = userData;
          setIsFetching(false);
        })
        .catch((err) => {
          setIsFetching(false);
          setError(err.message);
        });
    }
  }, [fetchUser, user]);

  const handleFollow = () => {
    user!.isFollowed = true;
  }

  const handleUnfollow = () => {
    user!.isFollowed = false;
  }

  const handleBlock = () => {
    user!.isBlocked = true;
  }

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  return (
    <div className={`user-profile ${user?.isBlocked ? 'blocked' : ''}`}>
      {user && !user.isBlocked && (
        <>
          <img className="user-image" src={user.profile_image} alt={user.display_name} />
          <h2 className="user-name">{user.display_name}</h2>
          <p className="user-reputation">Reputation: {user.reputation}</p>
          <p className={`user-follow-indicator ${user.isFollowed ? 'followed' : ''}`}>
            {user.isFollowed ? 'Followed' : ''}
          </p>
          {isExpanded && (
            <div className="user-actions">
              {!user.isFollowed 
                ? <button onClick={handleFollow}>Follow</button> 
                : <button onClick={handleUnfollow}>Unfollow</button>}
              <button onClick={handleBlock}>Block</button>
            </div>
          )}
          <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Hide details' : 'Show details'}
          </button>
        </>
      )}
      {user?.isBlocked && (
        <p className="blocked-user-message">This user is blocked.</p>
      )}
    </div>
  );
};

export default UserProfile;
