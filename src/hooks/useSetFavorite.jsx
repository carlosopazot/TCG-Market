import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const useSetFavorite = (item) => {
  const [favorite, setFavorite] = useState(false);
  const { openMessage } = useContext(ThemeContext);

  const handleFavorite = () => {
    setFavorite(!favorite);
    openMessage('success', `Se ${!favorite ? 'agregó' : 'eliminó'} ${item.name}`);
  }

  return { favorite, setFavorite, handleFavorite }
}

export default useSetFavorite;