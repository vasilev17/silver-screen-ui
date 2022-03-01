import React, { FC, useEffect, useState } from 'react';
import styles from './MovieRow.module.scss';
interface MovieRowProps{
  title:string,
}
const MovieRow: FC<MovieRowProps> = (MovieRowInfo) => { 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      fetch(`http://localhost:5000/MainPageMovieInfo/GetMoviesForMainPage?genre=${MovieRowInfo.title}`, requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Error while processing the request!");
          }
        })
        .then(data => { setMovie(data); });

      window.scrollTo(0, 0);
    }
     getDetail();

  }, [MovieRowInfo.title]);
  return (
<div>
  <h2>{MovieRowInfo.title}</h2>
</div>
  );
}
export default MovieRow;
