import { useState, useRef } from "react";
import { login, signup } from "../services/authService";
import Logout from "./Logout";
import * as Components from "./AuthComponents";

const User = ({ currUser, setCurrUser }) => {
  const loginFormRef = useRef();
  const signupFormRef = useRef();
  const [signIn, toggle] = useState(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    await login(userInfo, setCurrUser);
    e.target.reset();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(signupFormRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    await signup(userInfo, setCurrUser);
    e.target.reset();
  };

  return (
    <>
      {currUser ? (
        <div>
          Hello {currUser.email}
          <Logout setCurrUser={setCurrUser} />
        </div>
      ) : (
        <>
          <Components.ParentContainer>
            <Components.Container>
              <Components.SignUpContainer signingIn={signIn}>
                <Components.Form
                  ref={signupFormRef}
                  onSubmit={handleSignupSubmit}
                >
                  <Components.Title>Create Account</Components.Title>
                  <Components.Input
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <Components.Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <Components.Button>Sign Up</Components.Button>
                </Components.Form>
              </Components.SignUpContainer>
              <Components.SignInContainer signingIn={signIn}>
                <Components.Form
                  ref={loginFormRef}
                  onSubmit={handleLoginSubmit}
                >
                  <Components.Title>Sign in</Components.Title>
                  <Components.Input
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  <Components.Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <Components.Button>Sign In</Components.Button>
                </Components.Form>
              </Components.SignInContainer>
              <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                  <Components.LeftOverlayPanel signingIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                      To keep connected with us please login with your personal
                      info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                      Sign In
                    </Components.GhostButton>
                  </Components.LeftOverlayPanel>
                  <Components.RightOverlayPanel signingIn={signIn}>
                    <Components.Title>Hello, Friend!</Components.Title>
                    <Components.Paragraph>
                      Enter your personal details and start journey with us
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(false)}>
                      Sign Up
                    </Components.GhostButton>
                  </Components.RightOverlayPanel>
                </Components.Overlay>
              </Components.OverlayContainer>
            </Components.Container>
          </Components.ParentContainer>
        </>
      )}
    </>
  );
};

export default User;
