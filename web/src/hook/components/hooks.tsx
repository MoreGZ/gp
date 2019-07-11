import { useState, useEffect } from 'react';

export function useFriendStatus(id: number) {
  const [isOnline, setIsOnline] = useState(false);

  function handleStatusChange(isOnline: boolean) {
    setIsOnline(!isOnline);
  }

  // useEffect(() => {
  //   console.log(`${id} online status`)
  //   return () => {
  //     console.log(`${id} online status out`)
  //   };
  // });

  return {isOnline, handleStatusChange}
}