import { createContext, useCallback, useReducer, useState, useEffect } from "react";


export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (currentpostList, action) => {

  let newPostlist = currentpostList;
  if (action.type === "DELETE_POST") {
    newPostlist = currentpostList.filter(posts => action.payload.postId !== posts.id);

  }
  else if (action.type === "ADD_POST") {
    newPostlist = [action.payload, ...currentpostList];
  }
  else if (action.type === "ADD_INITIAL_POSTS") {
    newPostlist = action.payload.posts;

  }
  return newPostlist;
}

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList(
      {
        type: "ADD_POST",
        payload: {
          ...post,
          photo: () => {
            return <img src="../public/success.png" className="card-img-top" alt="..." />;
          }
        }
      }
    );

  };

  const addInitialPosts = (posts) => {
    dispatchPostList(
      {
        type: "ADD_INITIAL_POSTS",
        payload: { posts, }
      }
    );

  };

  const deletePost = useCallback((postId) => {
    dispatchPostList(
      {
        type: "DELETE_POST",
        payload: { postId }
      }
    );

  }, [dispatchPostList]);


  useEffect(() => {
    setFetching(true);

    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up useEffect");
      controller.abort();
    }

  }, []);

  return (
    <PostList.Provider value={{ postList, fetching, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );

}

export default PostListProvider