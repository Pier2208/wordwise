import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [geolocationPosition, setGeolocationPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoadingPosition(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeolocationPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoadingPosition(false);
      },
      (error) => {
        setError(error.message);
        setIsLoadingPosition(false);
      }
    );
  }

  return { isLoadingPosition, geolocationPosition, error, getPosition };
}
