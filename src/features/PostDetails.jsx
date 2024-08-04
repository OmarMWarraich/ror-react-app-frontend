import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost, fetchPost } from "../services/postService";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.alt ? "#f0f0f0" : "#f9f9f9")};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Body = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
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
`;

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchPost(id);
        setPost(post);
      } catch (error) {
        console.error("Failed to fetch the post:", error);
      }
    };
    loadPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <Container alt={id % 2 === 0}>
      <Title>{post.title}</Title>
      <Image src={post.image_url} alt={post.title} />
      <Body>{post.body}</Body>
      <LinkContainer>
        <StyledLink to="/">Back to Posts</StyledLink>
        <StyledLink to={`/posts/${post.id}/edit`}>Edit</StyledLink>
        <Button onClick={deletePostHandler}>Delete</Button>
      </LinkContainer>
    </Container>
  );
};

export default PostDetails;
