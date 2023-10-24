import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import DeleteIcon from "@mui/icons-material/Delete";
import Paginacion from "./Paginacion";

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async () => {
    const postsCollectionRef = collection(db, "posts");
    const q = query(postsCollectionRef, orderBy("timestamp", "desc"));

    const data = await getDocs(q);
    setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setTotalPosts(data.docs.length);
  };

  useEffect(() => {
    fetchPosts();
    const getTotalPosts = async () => {
      const allPosts = await getDocs(collection(db, "posts"));
      setTotalPosts(allPosts.size);
    };
    getTotalPosts();
  }, [currentPage]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // Después de eliminar, volvemos a cargar las publicaciones
    fetchPosts();
    setCurrentPage(Math.ceil(postLists / 5));
  };

  const renderPostsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return postLists.slice(startIndex, endIndex);
  };

  return (
    <div className="homePage">
      {" "}
      {renderPostsForCurrentPage().map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title} </h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}{" "}
      <Paginacion
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
      />
    </div>
  );
}

export default Home;
