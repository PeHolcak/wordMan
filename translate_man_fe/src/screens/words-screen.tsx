import React, {useState, useEffect} from 'react';
import Loader from '../bricks/loader/loader';
import axios from 'axios';

type Word = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
  };


function WordsScreen() {
    const [movies, setMovies] = useState<Word[]>([]);
    useEffect(() => {
        async function fetchData() {
          const request = await axios.get("");
          setMovies(request.data.results);
          return request;
        }
        fetchData();
      }, []);

    return (
        <div className=''>

        </div>
    )
}

export default WordsScreen;
