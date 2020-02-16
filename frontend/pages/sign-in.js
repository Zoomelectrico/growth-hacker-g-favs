import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { endpoint } from '../config';
import AppContext from '../AppContext';

const SignIn = () => {
  const router = useRouter();
  const { setToken, setUser } = React.useContext(AppContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.post(
      `${endpoint}/sign-in`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (!data.success) {
      console.log(`err: ${data.err}`);
    }
    setToken(data.token);
    setUser(data.user);
    router.push('/users/[slug]', `/user/${data.user.slug}`);
  };

  return (
    <div className="container h-100 py-5">
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg p-3">
            <div className="card-title bg-white">
              <h2 className="text-uppercase text-center">Sign In</h2>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit} method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
