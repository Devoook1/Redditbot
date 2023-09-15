import React from 'react';
import { useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { List, Avatar, Button } from 'antd';
import axios from 'axios';

const initialState = {
  redditAccount: null,
  bio: '',
  subreddits: [],
  pictures: [],
};

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setRedditAccount: (state, action) => {
      state.redditAccount = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    addSubreddit: (state, action) => {
      state.subreddits.push(action.payload);
    },
    removeSubreddit: (state, action) => {
      state.subreddits = state.subreddits.filter((subreddit) => subreddit !== action.payload);
    },
    addPicture: (state, action) => {
      state.pictures.push(action.payload);
    },
    removePicture: (state, action) => {
      state.pictures = state.pictures.filter((picture) => picture !== action.payload);
    },
  },
});

const { setRedditAccount, setBio, addSubreddit, removeSubreddit, addPicture, removePicture } = redditSlice.actions;

const RedditBot = () => {
  const dispatch = useDispatch();

  const createAccount = () => {
    // Code to create a Reddit account
    // ...
    const redditAccount = 'your_new_reddit_account';
    dispatch(setRedditAccount(redditAccount));
  };

  const updateBio = (newBio) => {
    // Code to update the bio of the Reddit account
    // ...
    dispatch(setBio(newBio));
  };

  const addSubreddit = (subreddit) => {
    // Code to add a subreddit to the list
    // ...
    dispatch(addSubreddit(subreddit));
  };

  const removeSubreddit = (subreddit) => {
    // Code to remove a subreddit from the list
    // ...
    dispatch(removeSubreddit(subreddit));
  };

  const addPicture = (picture) => {
    // Code to add a picture to the list
    // ...
    dispatch(addPicture(picture));
  };

  const removePicture = (picture) => {
    // Code to remove a picture from the list
    // ...
    dispatch(removePicture(picture));
  };

  const postPictures = () => {
    // Code to post pictures in the specified subreddits
    // ...
    const { redditAccount, subreddits, pictures } = useSelector((state) => state.reddit);
    axios.post('https://reddit-api.com/post', { redditAccount, subreddits, pictures })
      .then((response) => {
        // Handle successful post
        // ...
      })
      .catch((error) => {
        // Handle error
        // ...
      });
  };

  return (
    <div>
      <Button onClick={createAccount}>Create Reddit Account</Button>
      <input type="text" onChange={(e) => updateBio(e.target.value)} />
      <List
        header={<div>Subreddits</div>}
        bordered
        dataSource={subreddits}
        renderItem={(subreddit) => (
          <List.Item>
            <Avatar src={`https://reddit.com/${subreddit}.png`} />
            {subreddit}
            <Button onClick={() => removeSubreddit(subreddit)}>Remove</Button>
          </List.Item>
        )}
      />
      <List
        header={<div>Pictures</div>}
        bordered
        dataSource={pictures}
        renderItem={(picture) => (
          <List.Item>
            <Avatar src={picture} />
            <Button onClick={() => removePicture(picture)}>Remove</Button>
          </List.Item>
        )}
      />
      <Button onClick={postPictures}>Post Pictures</Button>
    </div>
  );
};

export default RedditBot;
