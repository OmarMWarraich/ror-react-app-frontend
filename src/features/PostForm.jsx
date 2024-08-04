import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostForm = ({ post, headerText, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    post || {
      title: "",
      body: "",
      image: "",
    }
  );

  return (
    <FormContainer>
      <FormHeader>{headerText}</FormHeader>
      <StyledForm
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(formData);
        }}
      >
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              setFormData({
                ...formData,
                image: e.target.files[0],
              });
              console.log(e.target.files[0]);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value,
              })
            }
          />
        </FormGroup>
        <Button type="submit">{buttonText}</Button>
      </StyledForm>
    </FormContainer>
  );
};

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  post: null,
};

export default PostForm;
