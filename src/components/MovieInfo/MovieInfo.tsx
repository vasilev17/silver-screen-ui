import React, { FC, useEffect, useState } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';
import { useParams } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Alert, Box, Fade, Modal, Rating, Snackbar } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import WatchlistIcon from '@mui/icons-material/AddToQueueRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import CompletedIcon from '@mui/icons-material/BookmarkAddedRounded';



interface MovieInfoProps { }


const MovieInfo: FC<MovieInfoProps> = () => {

  const { id } = useParams();

  const [data, setData] = useState(null);

  const [releaseDate, setReleaseDate] = useState(null);

  const [duration, setDuration] = useState(null);

  const [friendRating, setFriendRating] = useState('?');

  const [personalRating, setPersonalRating] = useState(null);

  const [myListCategory, setMyListCategory] = useState(null);

  //Rating Modal Variables
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const handleOpenRatingModal = () => { setOpenRatingModal(true); setStarRatingValue(personalRating); }
  const handleCloseRatingModal = () => setOpenRatingModal(false);
  const [starRatingValue, setStarRatingValue] = useState(null);

  //MyList Modal Variables
  const [openMyListModal, setOpenMyListModal] = useState(false);
  const handleOpenMyListModal = () => {
    setOpenMyListModal(true);
    setMyListCategoryChoice(myListCategory);

  }
  const handleCloseMyListModal = () => { setOpenMyListModal(false); }
  const [myListCategoryChoice, setMyListCategoryChoice] = useState(null);

  //Rating Feedback Variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const showSnackbarFeedback = () => setOpenSnackbar(true);



  var token = localStorage.getItem('token');




  const getMovieDetails = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/MovieInfoGetRequest?movieID=${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the Movie Info request!");
        }
      })
      .then(info => {




        setData(info);


        //Set the tab title to the title and release date in brackets
        info.movie.releaseDate.includes('(') ? document.title = info.movie.title + " " + info.movie.releaseDate : document.title = info.movie.title + " (" + info.movie.releaseDate + ")";

        //Format duration in "?h ??m" format
        info.movie.duration < 60 ? setDuration(info.movie.duration + "m") : setDuration(Math.floor(info.movie.duration / 60) + 'h ' + info.movie.duration % 60 + 'm');

        //Cut brackets for subtitle string as long as it is not a time period (includes '–')
        if (info.movie.releaseDate.includes('(') && !(info.movie.releaseDate.includes('–')) && !(/[a-zA-Z]/.test(info.movie.releaseDate)))
          setReleaseDate(info.movie.releaseDate.substring(1, info.movie.releaseDate.length - 1));
        else
          setReleaseDate(info.movie.releaseDate);

        window.scrollTo(0, 0);


      });
  }


  const getMovieRatings = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/MovieRatingsGetRequest?movieID=${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the Movie Ratings request!");
        }
      })
      .then(info => {
        info.friendRating != 0 && setFriendRating(info.friendRating.toFixed(1));
        info.personalRating != 0 && setPersonalRating(info.personalRating);
      });

    window.scrollTo(0, 0);
  }

  const getMyListInfo = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/MyListInfoGetRequest?movieID=${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.warn("Error while processing the Movie Ratings request!");
        }
      })
      .then(info => {

        if (info == "Watchlist")
          setMyListCategory(false);

        else if (info == "Completed")
          setMyListCategory(true);

        else
          setMyListCategory(null);

      });

    window.scrollTo(0, 0);
  }

  function displayPersonalRating() {

    if (personalRating == null) {
      return (
        <>
          <div className={styles.ratings__ratingSource}>
            <StarBorderRoundedIcon className={styles.ratings__ratingStar} />
            <span className={styles.personalRating__actionLabel}>Rate</span>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.ratings__ratingSource}>
            <StarRoundedIcon className={styles.ratings__ratingStar} />
            <span className={styles.ratings__ratingNumber}>{personalRating}</span>
            <span className={styles.ratings__ratingOutOf}>/10</span>
          </div>
        </>
      )
    }
  }


  function displayMyList() {

    if (myListCategory == null) {
      return (
        <>
          <div className={styles.ratings__ratingSource}>
            <BookmarkBorderRoundedIcon className={styles.myList__icon} />
            <span className={styles.myList__actionLabel}>Add</span>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.ratings__ratingSource}>
            <BookmarkRoundedIcon className={styles.myList__iconAdded} />
            <span className={styles.myList__actionLabel}>Added</span>
          </div>
        </>
      )
    }
  }


  const submitRating = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/RateMovie?movieID=${id}&rating=${starRatingValue}`, requestOptions)
      .then(response => {
        if (response.ok) {
          handleCloseRatingModal();
          setTimeout(() => {
            setPersonalRating(starRatingValue);
            showSnackbarFeedback();
          }, 150);
          return response.json();
        } else {
          console.warn("Error while processing the the give a rating request!");
        }
      })
  }


  const removeRating = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/RemoveRating?movieID=${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          handleCloseRatingModal();
          setTimeout(() => {
            setPersonalRating(null);
            showSnackbarFeedback();
          }, 150);
          return response.json();
        } else {
          console.warn("Error while processing the remove a rating request!");
        }
      })
  }

  const addToMyList = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/AddMovieToMyList?movieID=${id}&watched=${myListCategoryChoice}`, requestOptions)
      .then(response => {
        if (response.ok) {
          handleCloseMyListModal();
          setTimeout(() => {
            setMyListCategory(myListCategoryChoice);
            showSnackbarFeedback();
          }, 150);
          return response.json();
        } else {
          console.warn("Error while processing the add a title to MyList request!");
        }
      })
  }

  const removeMovieFromMyList = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API}/MovieInfo/RemoveMovieFromMyList?movieID=${id}`, requestOptions)
      .then(response => {
        if (response.ok) {
          handleCloseMyListModal();
          setTimeout(() => {
            setMyListCategory(null);
            showSnackbarFeedback();
          }, 150);
          return response.json();
        } else {
          console.warn("Error while processing the remove from MyList request!");
        }
      })
  }

  function formatSubittleInfo() {

    let subtitleString: string = "";

    if (data.movie.releaseDate != null) subtitleString += releaseDate;
    if (data.movie.maturityRating != null) subtitleString += ' | ' + data.movie.maturityRating;
    if (data.movie.duration != null) subtitleString += ' | ' + duration;

    return subtitleString;

  }


  function displayCrewMembers(memberPosition) {

    if (data.staff.$values.some(member => member.position === memberPosition))
      return (
        <>
          {
            memberPosition == "Actor" ?
              <span className={styles.crew__crewPosition}>{memberPosition}s:</span>
              :
              <span className={styles.crew__crewPosition}>{memberPosition}:</span>
          }
          <span className={styles.crew__actorNames}>
            {
              data.staff.$values.filter(member => member.position === memberPosition).map((member, i) => (
                <>
                  <span className={styles.crew__crewName} key={i}>&nbsp;{member.name}</span>
                  <br />
                </>
              ))
            }
          </span>
          <br />
        </>
      );
  }


  function displaySnackbarFeedback() {

    return (
      <>
        <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={(event, reason) => {
          reason != 'clickaway' &&
            setOpenSnackbar(false);
        }}>

          <Alert onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
            reason != 'clickaway' &&
              setOpenSnackbar(false);
          }} severity="success" sx={{ background: 'rgb(56, 142, 60)', borderRadius: '7px', color: 'white' }}>
            Change successful!
          </Alert>

        </Snackbar>
      </>

    );
  }

  function displayRatingModal() {

    return (
      <>
        <Modal open={openRatingModal} onClose={handleCloseRatingModal}>
          <Fade in={openRatingModal}>
            <Box className={styles.personalRating__modal}>


              <CloseRoundedIcon fontSize="medium" onClick={handleCloseRatingModal} className={styles.personalRating__modal__closeBtn} />

              <StarRoundedIcon id='growingStar' className={styles.personalRating__modal__growingStar} />

              {starRatingValue != null ?
                <h1 id='growingStarTitle' className={styles.personalRating__modal__starTitle}>{starRatingValue}</h1>
                :
                <h1 className={styles.personalRating__modal__starTitle}>?</h1>
              }


              <h3 className={styles.personalRating__modal__label}>Rate</h3>
              <h2>{data.movie.title}</h2>
              <Rating max={10}
                icon={<StarRoundedIcon className={styles.personalRating__modal__pickerStarFilled} />}
                emptyIcon={<StarBorderRoundedIcon className={styles.personalRating__modal__pickerStarEmpty} />}
                defaultValue={starRatingValue}
                onChange={(event, newValue) => {

                  setStarRatingValue(newValue);
                  document.getElementById('growingStar').style.transform = `scale(${1 + newValue * 0.03})`;

                  if (newValue != null && newValue != personalRating)

                    document.getElementById('submitRatingBtn').classList.add(styles['submitButton__submitButtonActive']);

                  else
                    document.getElementById('submitRatingBtn').classList.remove(styles['submitButton__submitButtonActive']);

                }}
              />

              <div id='submitRatingBtn' onClick={submitRating} className={styles.submitButton}>Submit</div>

              {personalRating != null &&
                <div onClick={removeRating} className={styles.removeButton}>Remove rating</div>
              }

            </Box>
          </Fade>
        </Modal>
      </>
    );
  }

  function checkMyListSelection(event) {

    let currentSelection = event.target.value == "true";

    setMyListCategoryChoice(currentSelection);

    if (currentSelection != null && currentSelection != myListCategory)
      document.getElementById('submitMyListBtn').classList.add(styles['submitButton__submitButtonActive']);

    else
      document.getElementById('submitMyListBtn').classList.remove(styles['submitButton__submitButtonActive']);



  }




  function displayMyListModal() {

    return (
      <>
        <Modal open={openMyListModal} onClose={handleCloseMyListModal}>
          <Fade in={openMyListModal}>
            <Box className={styles.personalRating__modal}>


              <CloseRoundedIcon fontSize="medium" onClick={handleCloseMyListModal} className={styles.myList__modal__closeBtn} />

              <BookmarkAddRoundedIcon className={styles.myList__modal__headerIcon} />

              <h3 className={styles.myList__modal__label}>Add to MyList</h3>
              <h2 className={styles.myList__modal__titleLabel}>{data.movie.title}</h2>


              {myListCategoryChoice == false ?

                <input type="radio" name="myListOptionSelect" id="optionWatchlist" value="false" onChange={(event) => checkMyListSelection(event)} checked />
                :
                <input type="radio" name="myListOptionSelect" id="optionWatchlist" value="false" onChange={(event) => checkMyListSelection(event)} />

              }



              <label htmlFor="optionWatchlist" className={styles.myList__modal__selectionCard}>
                <div className={styles.myList__modal__selectionCheck}></div>
                <h4 className={styles.myList__modal__selectionLabel}>Watchlist</h4>
                <WatchlistIcon className={styles.myList__modal__selectionIcon} />
              </label>

              {
                myListCategoryChoice == true ?
                  <input type="radio" name="myListOptionSelect" id="optionCompleted" value="true" onChange={(event) => checkMyListSelection(event)} checked />
                  :
                  <input type="radio" name="myListOptionSelect" id="optionCompleted" value="true" onChange={(event) => checkMyListSelection(event)} />

              }



              <label htmlFor="optionCompleted" className={styles.myList__modal__selectionCard}>
                <div className={styles.myList__modal__selectionCheck}></div>
                <h4 className={styles.myList__modal__selectionLabel}>Completed</h4>
                <CompletedIcon className={styles.myList__modal__selectionCompletedIcon} />
              </label>


              <div id='submitMyListBtn' onClick={addToMyList} className={styles.submitButton}>Submit</div>

              {myListCategory != null &&
                <div onClick={removeMovieFromMyList} className={styles.removeButton}>Remove from MyList</div>
              }

            </Box>
          </Fade>
        </Modal>
      </>
    );
  }



  useEffect(() => {

    getMovieDetails();
    getMovieRatings();
    getMyListInfo();

  }, [id]);



  return (
    <>
      {
        data && (
          <>
            {displayRatingModal()}
            {displayMyListModal()}
            {displaySnackbarFeedback()}

            <div className={styles.banner} style={{ backgroundImage: `url(${data.movie.thumbnail})` }}></div>

            <div className={styles.content}>

              <div className={styles.movieImage} style={{ backgroundImage: `url(${data.movie.thumbnail})` }}></div>
              <div className={styles.movieInfo}>
                <h1 className={styles.movieInfo__title}>{data.movie.title}</h1>
                <h2 className={styles.movieInfo__subtitle}>{formatSubittleInfo()}</h2>
                <p className={styles.movieInfo__description}>{data.movie.description}</p>
              </div>

              <div onClick={handleOpenRatingModal} className={styles.personalRating}>
                <span className={styles.personalRating__title}>My Rating:</span>
                {displayPersonalRating()}
              </div>


              <div onClick={handleOpenMyListModal} className={styles.myList}>
                <span className={styles.personalRating__title}>My List:</span>
                {displayMyList()}
              </div>





              <div>



              </div>

              <div className={styles.ratings}>
                <span className={styles.sectionTitle}>Ratings:</span>
                <hr className={styles.sectionSeparator} />

                <div className={styles.ratings__ratingSection}>
                  <div className={styles.ratings__ratingSource}>
                    <img src="/IMDb_icon.svg" alt="IMDb:" />
                    <StarRoundedIcon className={styles.ratings__ratingStar} />

                    {data.movie.rating == null ?
                      <span className={styles.ratings__ratingNumber}>?</span>
                      :
                      <span className={styles.ratings__ratingNumber}>{data.movie.rating.toFixed(1)}</span>
                    }


                    <span className={styles.ratings__ratingOutOf}>/10</span>
                  </div>

                  <div className={styles.ratings__ratingSource}>
                    <img src="/FriendRating_icon.svg" alt="Friend Rating:" />
                    <StarRoundedIcon className={styles.ratings__ratingStar} />
                    <span className={styles.ratings__ratingNumber}>{friendRating}</span>
                    <span className={styles.ratings__ratingOutOf}>/10</span>
                  </div>

                </div>

              </div>

              <div className={styles.genres}>
                <span className={styles.sectionTitle}>Genres:</span>
                <hr className={styles.sectionSeparator} />
                {
                  data.genres.$values.map((genre, i) => (
                    <a href={'/' + genre} key={i} className={styles.genres__item}>{genre}</a>
                  ))
                }
              </div>

              <div className={styles.crew}>
                <span className={styles.sectionTitle}>Crew:</span>
                <hr className={styles.sectionSeparator} />
                <div className={styles.crew__crewMembers}>

                  {displayCrewMembers("Director")}

                  {displayCrewMembers("Writer")}

                  {displayCrewMembers("Actor")}

                </div>

              </div>

            </div>



          </>

        )
      }
    </>
  );
}

export default MovieInfo;
