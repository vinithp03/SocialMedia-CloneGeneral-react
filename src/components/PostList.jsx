import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import { PostList as postData } from '../store/post-list-store'
import WelcomeMsg from './WelcomeMsg';
import LoadingSpinner from './LoadingSpinner';

const PostList = () => {

  const { postList, fetching } = useContext(postData);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMsg />}
      {!fetching && postList.map(post => <Post key={post.id} post={post} />)
      }

    </>
  )
}

export default PostList