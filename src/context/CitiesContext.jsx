import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

// provider
export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (err) {
        console.log("Error loading cities.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log("Error fetching city.");
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (city) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((prevState) => [...prevState, data]);
    } catch (err) {
      console.log("Error adding city.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, getCity, createCity, currentCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// context hook
// eslint-disable-next-line react-refresh/only-export-components
export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
};
