import { Skeleton } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import styles from './MovieRow.module.scss';
import ArrowLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowCircleRight';
interface MovieRowProps {
  genre?,
  content?,
  showGenreTittle,
  myListIsWatched?,
  searchString?
}
const MovieRow: FC<MovieRowProps> = (MovieRowInfo) => {

  const [movies, setMovies] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const contentWrapper = React.useRef(null);
  var token = localStorage.getItem('token');

  const sideScroll = (
    element: HTMLDivElement,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;

    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  useEffect(() => {
    const getDetail = async () => {
      const requestOptionsWithoutAuthorization = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      const requestOptionsWithAuthorization = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      if (MovieRowInfo.content == null) {
        if (MovieRowInfo.genre == null) {
          if (MovieRowInfo.myListIsWatched == null) {

            fetch(`${process.env.REACT_APP_API}/MainPageMovieInfo/GetMoviesBySearch?searchString=${MovieRowInfo.searchString}`, requestOptionsWithoutAuthorization)
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  console.warn("Error while processing the Movie Info request!");
                }
              })
              .then(data => {

                setMovies(data);
                setLoaded(true);
              });

          } else {
            //myList movies
            fetch(`${process.env.REACT_APP_API}/MainPageMovieInfo/GetMoviesForMyList?watched=${MovieRowInfo.myListIsWatched}`, requestOptionsWithAuthorization)
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  console.warn("Error while processing the request!");
                }
              })
              .then(data => { setMovies(data); setLoaded(true); });
          }
        } else {
          //get movies with genre
          fetch(`${process.env.REACT_APP_API}/MainPageMovieInfo/GetMoviesForMainPage?genre=${MovieRowInfo.genre}`, requestOptionsWithoutAuthorization)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                console.warn("Error while processing the request!");
              }
            })
            .then(data => { setMovies(data); setLoaded(true); });
        }
      } else {
        //get movies with content and genre
        fetch(`${process.env.REACT_APP_API}/MainPageMovieInfo/GetMoviesByContentAndGenre?genre=${MovieRowInfo.genre}&content=${MovieRowInfo.content}`, requestOptionsWithoutAuthorization)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.warn("Error while processing the request!");
            }
          })
          .then(data => { setMovies(data); setLoaded(true); });
      }
      window.scrollTo(0, 0);
    }
    getDetail();

  }, [MovieRowInfo.genre]);



  const handleClick = (id) => {
    window.location.href = "/title/" + id;

  };

  function DisplayMoviesInSeparateRows() {
    return (
      <>
        <div className={styles.rowThumbnails2}>
          {movies.$values.map((movie, i) => (
            <img onClick={() => handleClick(movie.id)} key={i}
              className={styles.rowThumbnail}
              src={movie.thumbnail}
              alt={movie.title}
            />
          ))}
        </div>
      </>

    )
  }

  function DisplayMovies() {
    if (loaded) {
      //movie map code
      if (MovieRowInfo.myListIsWatched != null || MovieRowInfo.searchString != null) {

        return DisplayMoviesInSeparateRows();
      } else {


        return (
          <>
            {MovieRowInfo.showGenreTittle && <h2 className={styles.title}>{MovieRowInfo.genre}</h2>}

            <div className={styles.rowThumbnails}>
            <div className={styles.ContentWrapper} ref={contentWrapper}>
              {movies.$values.map((movie, i) => (
                <img onClick={() => handleClick(movie.id)} key={i}
                  className={styles.rowThumbnail}
                  src={movie.thumbnail}
                  alt={movie.title}
                />
              ))}
              </div>
              </div>
              <div className={styles.ButtonWrapper}>
                <div className={styles.Button}
                  onClick={() => {
                    sideScroll(contentWrapper.current, 15, 620, -30);
                  }}
                >
                  <ArrowLeftIcon className={styles.Arrow}/>
                </div>
                <div className={styles.Button}
                  onClick={() => {
                    sideScroll(contentWrapper.current, 15, 620, 30);
                  }}
                >
                  <ArrowRightIcon className={styles.Arrow}/>
                </div>
              </div>
            
          </>
        );
      }
    }
    else {
      //skeleton code
      return (
        <div style={{ display: "flex" }}>
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
          <Skeleton variant="rectangular" width={150} height={225} style={{ marginRight: "10px", borderRadius: "25px" }} />
        </div>
      );
    }
  }


  return (
    <>



      <div className={styles.row}>
        {DisplayMovies()}
      </div>
    </>
  );
}
export default MovieRow;
