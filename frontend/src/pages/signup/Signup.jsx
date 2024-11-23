import React, { useState } from 'react'
import Gender from './Gender';
import useSignup from '../../hooks/useSignup';

const Singup = () => {

  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const { loading, signup } = useSignup();

  const genderCheckBox = (gender) => {
    setInputs({ ...inputs, gender });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(inputs);
  }

  return (
    <div className='singup-wrapper'>
      <div className='singup-window'>
        <form class="form" onSubmit={handleSubmit}>
          <p class="form-title">Sign up to your account</p>
          <div class="input-container">
            <input type="text" placeholder="Fullname Name"
              value={inputs.fullname}
              onChange={(e => setInputs({ ...inputs, fullname: e.target.value }))} />
            <span></span>
          </div>
          <div class="input-container">
            <input type="text" placeholder="User Name"
              value={inputs.username}
              onChange={(e => setInputs({ ...inputs, username: e.target.value }))} />
            <span></span>
          </div>
          <div class="input-container">
            <input type="password" placeholder="Enter password"
              value={inputs.password}
              onChange={(e => setInputs({ ...inputs, password: e.target.value }))} />
          </div>
          <div class="input-container">
            <input type="password" placeholder="Confirm password"
              value={inputs.confirmPassword}
              onChange={(e => setInputs({ ...inputs, confirmPassword: e.target.value }))} />
          </div>
          <div>
            <Gender onCheckBoxChange={genderCheckBox} selectedGender={inputs.gender} />
          </div>
          <button type="submit" class="submit" disabled={loading}>
            {loading ? <span>Loading...</span> : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Singup;