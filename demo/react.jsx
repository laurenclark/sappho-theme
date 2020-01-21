import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(
                props.friend.id,
                handleStatusChange
            );
        };
    });

    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}
