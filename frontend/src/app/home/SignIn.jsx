import React from "react";
import styled from "styled-components";

  const SignIn =  ({ boo }) => {
    
  if (boo === true) { 
    return (
      <div >
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>SignUp</button>
      </div>
    );
  } else {
    return (
      <div>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>SignIn</button>
      </div>
    );
  }
}
export default SignIn;

const Container = styled.div`
    position: absolute;
    left: 
`
