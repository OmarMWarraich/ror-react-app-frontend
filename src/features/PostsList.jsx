import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { deletePost } from "../services/postService";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import usePostsData from "../hooks/usePostsData";
import useURLSearchParam from "../hooks/useURLSearchParam";
import Pagination from "./Pagination";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PostImageContainer = styled.div`
  margin-bottom: 1rem;

  .post-image {
    width: 100%;
    height: 200px;
    border-radius: 8px;
  }

  .post-image-stub {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    border-radius: 8px;
  }
`;

const PostLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c82333;
    }
  }
`;

function PostsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useURLSearchParam("search");

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPageFromURL = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPageFromURL);

  const [posts, setPosts] = useState([]);
  const {
    posts: fetchedPosts,
    totalPosts: totalPosts,
    loading: loading,
    error: error,
    perPage: perPage,
  } = usePostsData(debouncedSearchTerm, currentPage);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    const initialSearchTerm = searchParams.get("search") || "";
    setSearchTerm(initialSearchTerm);

    const pageFromURL = searchParams.get("page") || "1";
    setCurrentPage(Number(pageFromURL));
  }, [searchParams]);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (e) {
      console.error("Failed to delete the post: ", e);
    }
  };

  const handleImmediateSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleDebouncedSearchChange = (searchValue) => {
    setDebouncedSearchTerm(searchValue);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search: debouncedSearchTerm, page: page });
  };

  return (
    <Container>
      <SearchBar
        value={searchTerm}
        onSearchChange={handleDebouncedSearchChange}
        onImmediateChange={handleImmediateSearchChange}
      />
      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        postsPerPage={perPage}
        onPageChange={handlePageChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts.</p>}

      {posts.map((post) => (
        <PostContainer key={post.id}>
          <PostTitle>
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
          </PostTitle>
          <PostImageContainer>
            {post.image_url ? (
              <img
                src={post.image_url}
                alt={post.title}
                className="post-image"
              />
            ) : (
              <div className="post-image-stub" data-testid="post-image-stub" />
            )}
          </PostImageContainer>
          <PostLinks>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
          </PostLinks>
        </PostContainer>
      ))}
    </Container>
  );
}

export default PostsList;
