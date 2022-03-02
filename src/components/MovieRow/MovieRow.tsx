import React, { FC, useEffect, useState } from 'react';
import styles from './MovieRow.module.scss';
interface MovieRowProps{
  title:string,
}
const MovieRow: FC<MovieRowProps> = (MovieRowInfo) => { 
  const [movies, setMovies] = useState(null);

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
        .then(data => { setMovies(data); });

      window.scrollTo(0, 0);
    }
     getDetail();

  }, [MovieRowInfo.title]);
  return (
    <>
    {
      movies && (
        <>

<div className={styles.row}>
  <h2 className={styles.title}>{MovieRowInfo.title}</h2>

  <div className={styles.rowThumbnails}>

    {movies.$values.map((movie, i) => (
        <img key={i}
        className={styles.rowThumbnail}
        src={movie.thumbnail}
        alt={movie.title} 
        />
    ))}
  </div>
</div>
</>

)
}
</>
  );
}
export default MovieRow;
