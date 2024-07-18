import { useEffect, useState } from "react";
import axios from "axios";

const useFetchVariants = (cardName) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    const fetchEditions = async (printsSearchUri) => {
      try {
        const response = await axios.get(printsSearchUri);
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener ediciones relacionadas', error);
        return [];
      }
    };
    const fetchCards = async (name) => {
      try {
        if (name !== '') {
          setLoading(true);
          const response = await axios.get(
            `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
          );
          const cardData = response.data;
          setCards([cardData]);
          if (cardData.prints_search_uri) {
            const editionsData = await fetchEditions(cardData.prints_search_uri);
            setEditions(editionsData);
          }
        }
      } catch (error) {
        console.error('Error al obtener detalles de la carta', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCards(cardName);

  }, [cardName]);

  return { cards, editions, loading }
}


export default useFetchVariants;