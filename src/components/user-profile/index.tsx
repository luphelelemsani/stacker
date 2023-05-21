import React, { useState, useEffect } from 'react';
import { User, blockUser, followUser, unblockUser, unfollowUser } from '../../store/reducers/users-reducer';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import '../../theme/components/userProfile.css'; // Assuming your CSS file is named UserProfile.css and is located in the same directory

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    
  const dispatch:AppDispatch = useDispatch();

  const {id, display_name, profile_image, reputation, isFollowed, isBlocked } = user

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);


  useEffect(() => {
    if (!user) {
      setIsFetching(false);
      setError("user profile not found");
      }
    
  }, [user]);

  const handleFollowUser = (userId: number) => {
    dispatch(followUser(userId));
  };

  const handleUnfollowUser = (userId: number) => {
    dispatch(unfollowUser(userId));
  };

  const handleBlockUser = (userId: number) => {
    dispatch(blockUser(userId));
  };

  const handleUnblockUser = (userId: number) => {
    dispatch(unblockUser(userId));
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  return (
    <div className={`user-profile ${user?.isBlocked ? 'blocked' : ''}`}>
      {user && (
        <>
          <img className="user-image" src={profile_image} alt={display_name} />
          <h2 className="user-name">{display_name}</h2>
          <p className="user-reputation">Reputation: {reputation}</p>
          <p className={`user-follow-indicator ${isFollowed ? 'followed' : ''}`}>
            {isFollowed ? 'Followed' : ''}
          </p>
          {isExpanded && (
            <div className="user-actions">
              {!isFollowed 
                ? <button onClick={()=>handleFollowUser(id)}>Follow</button> 
                : <button onClick={()=>handleUnfollowUser(id)}>Unfollow</button>}
              {!isBlocked 
              ? <button onClick={()=>handleBlockUser(id)}>Block</button> 
              : <button onClick={()=>handleUnblockUser(id)}>Unblock</button>}
            </div>
          )}
          <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Hide details' : 'Show details'}
          </button>
        </>
      )}
      {isBlocked && (
        <p className="blocked-user-message">This user is blocked.</p>
      )}
    </div>
  );
};

export default UserProfile;
