import React, { useContext } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";


import { PostList } from "../store/post-list-store"


const Post = ({ post }) => {

  const { deletePost } = useContext(PostList);

  return (
    <div className="card" style={{ width: "30rem" }}>
      {<img src="../success.png" className="card-img-top" alt="..." style={{ width: "300px", height: "300px" }} />}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <span key={post.tags} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={() => deletePost(post.id)}>
          <MdDeleteForever />
        </span>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><button className='reactions'><FaEye />{" " + post.views || post.reactions + " "}</button><button className='reactions'>{post.reactions.likes || post.reactions + " "}<BiSolidLike /></button><button className='reactions'>{post.reactions.dislikes || post.reactions + " "}<AiFillDislike /></button></li>
        <li className="list-group-item">{post.body || post.description}</li>
        <li className="list-group-item">{post.tags.map((tag) => <span key={tag} className='badge text-bg-primary' style={{ margin: "0px 3px" }}>{tag}</span>)}</li>
      </ul>
    </div >
  )
}

export default Post