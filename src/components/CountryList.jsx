import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // given an array of objects, only keep unique objects
  const countries = [
    ...new Set(
      cities.map((city) =>
        JSON.stringify({ country: city.country, emoji: city.emoji })
      )
    ),
  ].map((country) => JSON.parse(country));

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
}
