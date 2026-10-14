import { useEffect, useState, useContext } from 'react';
import { ScrollView, Text } from 'react-native'; // Importing ScrollView and Text from react-native
import BadgerNewsItemCard from '../BadgerNewsItemCard';
import BadgerPreferencesContext from '../BadgerPreferencesContext';

function BadgerNewsScreen(props) {
  const [news, setNews] = useState([]);
   //const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

  useEffect(() => {
    fetch('https://cs571.org/api/s24/hw8/articles', {
      headers: {
        'X-CS571-ID': CS571.getBadgerId()
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
      });
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 48 }}>News</Text>
      {news.map((n) => {
        return <BadgerNewsItemCard key={n.id} {...n} />;
      })}
    </ScrollView>
  );
}

export default BadgerNewsScreen;