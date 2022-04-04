import React, { FC, useEffect, useState } from 'react';
import styles from './MovieInfo.module.scss';
import '../MovieInfo/MovieInfo.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Alert, Autocomplete, Box, Fade, Modal, Rating, Snackbar, TextField, Tooltip, useAutocomplete } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import WatchlistIcon from '@mui/icons-material/AddToQueueRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import CompletedIcon from '@mui/icons-material/BookmarkAddedRounded';
import RecommendationIcon from '@mui/icons-material/ForwardToInboxRounded';
import NotifyMeIcon from '@mui/icons-material/NotificationAddRounded';
import LockIcon from '@mui/icons-material/HttpsRounded';
import PlayIcon from '@mui/icons-material/PlayArrowRounded';
import CommentWriteElement from '../Comments/CommentWriteElement/CommentWriteElement';
import CommentLoader from '../Comments/CommentLoader/CommentLoader';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CheckIcon from "@mui/icons-material/Check";

import NotifyMeActiveIcon from '@mui/icons-material/NotificationsActiveRounded';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';



interface MovieInfoProps { }


const MovieInfo: FC<MovieInfoProps> = () => {

  const { id } = useParams();

  const [data, setData] = useState(null);

  const navigate = useNavigate();

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


  //Recommend Modal Variables
  const [openRecommendModal, setOpenRecommendModal] = useState(false);
  const handleOpenRecommendModal = () => {
    setOpenRecommendModal(true);
  }
  const handleCloseRecommendModal = () => { setOpenRecommendModal(false); setRecommendationMessageContents(""); setRecommendationMessageLength(0); }


  //Trailer Modal Variables
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  const handleOpenTrailerModal = () => {
    setOpenTrailerModal(true);
  }
  const handleCloseTrailerModal = () => setOpenTrailerModal(false);





  //Snackbar Feedback Variables
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const showSnackbarFeedback = (message, snackbarType) => {
    setSnackbarMessage(message);
    setSnackbarType(snackbarType);
    setOpenSnackbar(true);
  }
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");


  const [logged, setLogged] = useState(false);
  var loggedUsersOnly = !logged ? styles.disabled : '';

  var token = localStorage.getItem('token');

  //Friend Select
  const [friendSelectValue, setFriendSelectValue] = useState(null);



  const onAutocompleteChange = (value) => {

    setFriendSelectValue(value);

  }



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
          navigate("/pageNotFound");
        }
      }).catch(() => {

        console.warn("Error while processing the Movie Info request!");

      })
      .then(info => {

        if (info.movie == null)
          navigate('/pageNotFound');

        setData(info);

        if (new Date(info.movie.releaseDate).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))
          setReleaseDate(info.movie.releaseDate.replace(/-/g, "/"));
        else
          setReleaseDate(info.movie.releaseDate.substring(0, 4));

        document.title = info.movie.title + " (" + info.movie.releaseDate.substring(0, 4) + ")"
        info.movie.duration < 60 ? setDuration(info.movie.duration + "m") : setDuration(Math.floor(info.movie.duration / 60) + 'h ' + info.movie.duration % 60 + 'm');

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
          setLogged(true);
          return response.json();
        }
      }).catch(() => {

        console.warn("Error while processing the Movie Ratings request!");

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
          setLogged(true);
          return response.json();
        }
      }).catch(() => {

        console.warn("Error while processing the Movie Ratings request!");

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
          <div onClick={handleOpenRatingModal} className={`${styles.personalRating} ${loggedUsersOnly}`} >
            <span className={styles.personalRating__title}>My Rating:</span>
            <div className={styles.ratings__ratingSource}>
              <StarBorderRoundedIcon className={styles.ratings__ratingStar} />
              <span className={styles.personalRating__actionLabel}>Rate</span>
            </div>
          </div>

          {!logged &&
            <Tooltip title="Sign in to rate" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
              <LockIcon className={styles.disabled__personalRating} />
            </Tooltip>
          }


        </>
      )
    } else {
      return (
        <>
          <div onClick={handleOpenRatingModal} className={`${styles.personalRating} ${loggedUsersOnly}`} >
            <span className={styles.personalRating__title}>My Rating:</span>
            <div className={styles.ratings__ratingSource}>
              <StarRoundedIcon className={styles.ratings__ratingStar} />
              <span className={styles.ratings__ratingNumber}>{personalRating}</span>
              <span className={styles.ratings__ratingOutOf}>/10</span>
            </div>
          </div>
        </>
      )
    }
  }


  function displayMyList() {

    if (myListCategory == null) {
      return (
        <>
          <div onClick={handleOpenMyListModal} className={`${styles.myList} ${loggedUsersOnly}`}>
            <span className={styles.personalRating__title}>My List:</span>
            <div className={styles.ratings__ratingSource}>
              <BookmarkBorderRoundedIcon className={styles.myList__icon} />
              <span className={styles.myList__actionLabel}>Add</span>
            </div>
          </div>

          {!logged &&
            <Tooltip title="Sign in to add to MyList" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
              <LockIcon className={styles.disabled__myList} />
            </Tooltip>
          }
        </>
      )
    } else {
      return (
        <>
          <div onClick={handleOpenMyListModal} className={styles.myList}>
            <span className={styles.personalRating__title}>My List:</span>
            <div className={styles.ratings__ratingSource}>
              <BookmarkRoundedIcon className={styles.myList__iconAdded} />
              <span className={styles.myList__actionLabel}>Added</span>
            </div>
          </div>
        </>
      )
    }
  }

  function displayTMDBRating() {

    return (
      <Tooltip title="TMDB rating" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
        <div className={styles.ratings__ratingSource}>
          <img src="/TMDB_icon.svg" alt="TMDB:" />
          <StarRoundedIcon className={styles.ratings__ratingStar} />

          {data.movie.rating == null ?
            <span className={styles.ratings__ratingNumber}>?</span>
            :
            <span className={styles.ratings__ratingNumber}>{data.movie.rating.toFixed(1)}</span>
          }

          <span className={styles.ratings__ratingOutOf}>/10</span>
        </div>
      </Tooltip>
    )
  }

  function displayFriendRating() {

    return (
      <>
        <Tooltip title="Average of your friends' ratings" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
          <div className={`${styles.ratings__ratingSource} ${loggedUsersOnly}`}>
            <img src="/FriendRating_icon.svg" alt="Friend Rating:" />
            <StarRoundedIcon className={styles.ratings__ratingStar} />
            <span className={styles.ratings__ratingNumber}>{friendRating}</span>
            <span className={styles.ratings__ratingOutOf}>/10</span>
          </div>
        </Tooltip>
        {!logged &&
          <Tooltip title="Sign in to see your friends' ratings" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
            <LockIcon className={styles.disabled__friendRating} />
          </Tooltip>
        }
      </>
    )

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
            showSnackbarFeedback("Rating successful!", "success");
          }, 150);
          return response.json();
        }
      }).catch(() => {

        showSnackbarFeedback("Rating error!", "error");
        console.warn("Error while processing the the give a rating request!");

      });
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
            showSnackbarFeedback("Rating successfully removed!", "success");
          }, 150);
          return response.json();
        }
      }).catch(() => {

        showSnackbarFeedback("Remove rating error!", "error");
        console.warn("Error while processing the remove a rating request!");

      });
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
            showSnackbarFeedback("Successfully added to MyList!", "success");
          }, 150);
          return response.json();
        }
      }).catch(() => {

        showSnackbarFeedback("Add to MyList error!", "error");
        console.warn("Error while processing the add a title to MyList request!");

      });
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
            showSnackbarFeedback("Successfully removed from MyList!", "success");
          }, 150);
          return response.json();
        }
      }).catch(() => {

        showSnackbarFeedback("Remove from MyList error!", "error");
        console.warn("Error while processing the remove from MyList request!");

      });
  }

  const SendRecommendation = async () => {

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        friendIds: friendSelectValue.map((user) => user.id),
        movieId: id,
        message: recommendationMessageContents,
      })
    };

    fetch(`${process.env.REACT_APP_API}/NotificationManagement/RecommendMovieToAFriend`, requestOptions)
      .then(response => {
        if (response.ok) {
          handleCloseRecommendModal();
          setTimeout(() => {
            showSnackbarFeedback("Recommendation successfully sent!", "success");
          }, 150);
          return response.json();
        }
      }).catch(() => {

        showSnackbarFeedback("Send recommendation error!", "error");
        console.warn("Error while processing the recommend to a friend request!");

      });
  }


  function formatSubittleInfo() {

    let subtitleString: string = "";


    if (data.movie.releaseDate != null) subtitleString += releaseDate;
    if (data.movie.contentType != null) subtitleString += ' | ' + data.movie.contentType;
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
                <div key={i}>
                  <span className={styles.crew__crewName}>&nbsp;{member.name}</span>
                  <br />
                </div>
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
          }} severity={snackbarType == "success" ? "success" : "error"} sx={snackbarType == "success" ? { background: 'rgb(56, 142, 60)', borderRadius: '7px', color: 'white' } : { background: 'rgb(182 49 49)', borderRadius: '7px', color: 'white' }}>
            {snackbarMessage}
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

              <div id='submitRatingBtn' onClick={submitRating} className={styles.submitButton}>Rate</div>

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


              <div id='submitMyListBtn' onClick={addToMyList} className={styles.submitButton}>Add</div>

              {myListCategory != null &&
                <div onClick={removeMovieFromMyList} className={styles.removeButton}>Remove from MyList</div>
              }

            </Box>
          </Fade>
        </Modal>
      </>
    );
  }


  const [recommendationMessageContents, setRecommendationMessageContents] = useState("");
  const [recommendationMessageLength, setRecommendationMessageLength] = useState(0);

  function RefreshTextLenght() {
    var textBox = document.getElementById('recommendationMessage') as HTMLTextAreaElement;
    setRecommendationMessageLength(textBox.value.length);
    if (textBox.value.length > 300) {
      textBox.value = textBox.value.substring(0, 300);
      setRecommendationMessageLength(300);
    };
    setRecommendationMessageContents(textBox.value);
  }

  const RestrictEnter = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }



  function displayRecommendModal() {



    return (
      <>
        <Modal open={openRecommendModal} onClose={handleCloseRecommendModal}>
          <Fade in={openRecommendModal}>
            <Box className={styles.recommend__modal}>


              <CloseRoundedIcon fontSize="medium" onClick={handleCloseRecommendModal} className={styles.recommend__modal__closeBtn} />

              <MailRoundedIcon className={styles.recommend__modal__headerIcon} />

              <h3 className={styles.recommend__modal__label}>Recommend to friends</h3>
              <h2 className={styles.recommend__modal__titleLabel}>{data.movie.title}</h2>

              <AutoCompleteInput onAutocompleteChange={onAutocompleteChange} />


              <label className={styles.recommend__modal__messageLabel}>Message (optional):</label>
              <textarea className={styles.recommend__modal__message} id="recommendationMessage"
                onChange={() => RefreshTextLenght()}
                onKeyDown={(e) => RestrictEnter(e)}
                defaultValue={recommendationMessageContents}

              />

              <div className={styles.recommend__modal__message__wordCounter}>
                {recommendationMessageLength}/300
              </div>


              {friendSelectValue == null || friendSelectValue.length == 0 ?

                <div id='submitRecommendationBtn' className={styles.submitButton}>Send</div>
                :
                <div id='submitRecommendationBtn' onClick={SendRecommendation} className={`${styles.submitButton} ${styles.submitButton__submitButtonActive}`}>Send</div>
              }

            </Box>
          </Fade>
        </Modal>
      </>
    );
  }

  function displayTrailerModal() {

    if (data.movie.trailer != null) {
      return (
        <>
          <Modal open={openTrailerModal} onClose={handleCloseTrailerModal}>
            <Fade in={openTrailerModal}>
              <Box className={styles.trailerModal}>

                <CloseRoundedIcon fontSize="medium" onClick={handleCloseTrailerModal} className={styles.trailerModal__closeBtn} />

                <iframe className={styles.trailerModal__player} src={`${data.movie.trailer}?autoplay=1`} title="Title trailer" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

              </Box>
            </Fade>
          </Modal>
        </>
      );
    }
  }

  function displayRecommendSection() {

    return (
      <>
        <div className={styles.underDescriptionMenu__friendRecommendation}>

          <p className={styles.underDescriptionMenu__subsectionLabel}>Recommend:</p>

          <Tooltip title="Recommend to a friend" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
            <div onClick={handleOpenRecommendModal} className={styles.underDescriptionMenu__subsectionIcon}><RecommendationIcon sx={{ fontSize: '2.3em' }} /> </div>
          </Tooltip>
        </div>
      </>
    );
  }


  function displayNotifyMeSection() {

    if (new Date(data.movie.releaseDate) > new Date()) {
      return (
        <>
          <div className={styles.underDescriptionMenu__releaseNotification}>
            <p className={styles.underDescriptionMenu__subsectionLabel}>Notify Me:</p>
            <Tooltip title="Set a release date notification" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
              <div className={styles.underDescriptionMenu__subsectionIcon}><NotifyMeIcon sx={{ fontSize: '2.3em' }} /> </div>
            </Tooltip>
          </div>
        </>
      );
    }
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
            {displayRecommendModal()}
            {displayTrailerModal()}
            {displaySnackbarFeedback()}



            <div className={styles.banner} style={{ backgroundImage: `url(${data.movie.bgimage})` }}></div>

            <div className={styles.content}>

              <div className={styles.movieImage} style={{ backgroundImage: `url(${data.movie.thumbnail})` }}></div>
              <div className={styles.movieInfo}>
                <h1 className={styles.movieInfo__title}>{data.movie.title}</h1>
                <h2 className={styles.movieInfo__subtitle}>{formatSubittleInfo()}</h2>
                <p className={styles.movieInfo__description}>{data.movie.description}</p>

                <div className={`${styles.underDescriptionMenu} ${loggedUsersOnly}`}>
                  {displayRecommendSection()}
                  {displayNotifyMeSection()}
                </div>

                {data.movie.trailer != null &&
                  <div onClick={handleOpenTrailerModal} className={styles.trailerButton}>
                    <PlayIcon className={styles.trailerButton__icon} />
                    <p className={styles.trailerButton__label}>Trailer</p>
                  </div>
                }

                {!logged ? new Date(data.movie.releaseDate) > new Date() ?
                  <Tooltip title="Sign in to recommend to friends and set notifications" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
                    <LockIcon className={styles.disabled__underDescriptionMenuFull} />
                  </Tooltip>
                  :
                  <Tooltip title="Sign in to recommend to friends" enterDelay={600} enterNextDelay={600} leaveDelay={200} arrow>
                    <LockIcon className={styles.disabled__underDescriptionMenuPartial} />
                  </Tooltip>
                  :
                  null
                }

              </div>

              {displayPersonalRating()}

              {displayMyList()}

              <div>

              </div>

              <div className={styles.ratings}>
                <span className={styles.sectionTitle}>Ratings:</span>
                <hr className={styles.sectionSeparator} />

                <div className={styles.ratings__ratingSection}>

                  {displayTMDBRating()}
                  {displayFriendRating()}

                </div>

              </div>

              <div className={styles.genres}>
                <span className={styles.sectionTitle}>Genres:</span>
                <hr className={styles.sectionSeparator} />
                {
                  data.genres.$values.map((genre, i) => (
                    <a href={'/genre/' + genre.toLowerCase()} key={i} className={styles.genres__item}>{genre}</a>
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



              <div className={styles.commentSection}>
                <CommentWriteElement movieId={parseInt(id)} />
                <br />
                <CommentLoader movieId={parseInt(id)} />
              </div>


            </div>


          </>

        )
      }
    </>
  );
}

export default MovieInfo;
