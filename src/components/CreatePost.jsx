import React, { useContext, useRef } from 'react'
import { PostList } from '../store/post-list-store';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const useridElement = useRef('');
  const titleElement = useRef('');
  const descriptionElement = useRef('');
  const reactionsElement = useRef('');
  const tagElement = useRef('');

  const handlingElement = (e) => {
    e.preventDefault();

    const userId = useridElement.current.value;
    const title = titleElement.current.value;
    const description = descriptionElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagElement.current.value.split(" ");

    useridElement.current.value = "";
    titleElement.current.value = "";
    descriptionElement.current.value = "";
    reactionsElement.current.value = "";
    tagElement.current.value = "";

    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        userId: userId,
        body: description,
        reactions: reactions,
        tags: tags,
      })
    })
      .then(res => res.json())
      .then((data) => {
        addPost(data);
        navigate('/');
      });

  }


  return (
    <form className='createPost' onSubmit={handlingElement}>

      <div className="mb-3">
        <label htmlFor="userId" className="form-label">user id/name </label>
        <input type="text" ref={useridElement}
          className="form-control"
          id="userId" placeholder='enter your id' />
      </div>

      <div className="mb-3">
        <label htmlFor="title"
          className="form-label">Post Title</label>
        <input type="text" ref={titleElement}
          className="form-control"
          id="title" placeholder="How're you feeling now... " />
      </div>

      <div className="mb-3">
        <label htmlFor="description"
          className="form-label">Describe your post </label>
        <textarea type="text" rows={4} ref={descriptionElement}
          className="form-control"
          id="description" placeholder='Add description about your post ...' />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions"
          className="form-label">Num of Reactions</label>
        <input type="text" ref={reactionsElement}
          className="form-control"
          id="reactions" placeholder='give num of reactions you want' />
      </div>

      <div className="mb-3">
        <label htmlFor="tags"
          className="form-label">Tags</label>
        <input type="text" ref={tagElement}
          className="form-control"
          id="tags" />
      </div>

      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  )
}

export default CreatePost