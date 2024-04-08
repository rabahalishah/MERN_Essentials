Title: MERN Essentials: Full-Stack Starter Template

Overview:
MERN Essentials is a comprehensive full-stack starter template developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The primary objective of this project is to provide developers with a robust foundation and essential tools to kickstart their web development projects. With a focus on incorporating best coding practices and covering fundamental concepts, MERN Essentials offers features such as React forms validation, user registration functionality, full JWT (JSON Web Token) access token and refresh token authentication, and protected routes.

Key Features:
1. React Forms Validation:
   - MERN Essentials integrates React forms validation, enabling developers to create dynamic and user-friendly forms with ease.
   - Validation ensures that user input adheres to specified criteria, enhancing data integrity and user experience.

2. User Registration:
   - The template includes user registration functionality, allowing users to create accounts securely.
   - Through the registration process, users can set up personalized accounts to access features and interact with the application.

3. Full JWT Authentication:
   - MERN Essentials implements full JWT (JSON Web Token) authentication, offering secure access control mechanisms.
   - JWT tokens are generated upon successful authentication and are used to authenticate and authorize users for subsequent requests.

4. Refresh Token Mechanism:
   - In addition to access tokens, MERN Essentials incorporates a refresh token mechanism to maintain user sessions and enhance security.
   - Refresh tokens enable seamless authentication token renewal without requiring users to re-enter their credentials.

5. Protected Routes:
   - The template features protected routes, ensuring that certain sections of the application are accessible only to authenticated users.
   - By implementing protected routes, developers can control access to sensitive areas of the application and provide a secure user experience.

Benefits:
- Starter Template: MERN Essentials serves as a versatile starting point for developers embarking on MERN stack projects, eliminating the need to build authentication and validation systems from scratch.
- Best Coding Standards: The project adheres to best coding standards and practices, promoting code maintainability, scalability, and readability.
- Comprehensive Coverage: By covering essential concepts such as authentication, validation, and protected routes, MERN Essentials equips developers with a holistic understanding of full-stack development.

# Resgisteration Page:
![image](https://github.com/rabahalishah/MERN_Essentials/assets/117630286/c78892f5-e0fa-47ad-b788-217105e3c63e)

# Sign In page:
![image](https://github.com/rabahalishah/MERN_Essentials/assets/117630286/2f8a9798-3196-4c88-9651-44dec8274ff0)

# Home Page:
![image](https://github.com/rabahalishah/MERN_Essentials/assets/117630286/e6669a4d-00dc-4fe5-9f4b-9d96bb0f93d9)

# Admin Page:
![image](https://github.com/rabahalishah/MERN_Essentials/assets/117630286/7f7cb021-b251-4ba6-88e6-824cf732ed7d)


# Documentation
## Creating instance of your database:
```bash
// In axios.js
import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:3500', //make sure the base url of your backend and axios is same
});
```



# Creating a Registration validation form 
While working with validation form all we need is to work with three hooks, useState, useEffect, useRef and you have a Regual expression.
create states for validation and focus using useState hook. Here useRef will be used only for creating a ref between the component and const that you have defined. As in this case we are using ref=userRef and the target it by using userRef.current.focus() inside useEffect hook to have focus on when the component load.
Now simply create components and on the basis of their state apply css classes. This is all about validation forms.
```bash
// In Register.js (Component)
import { useRef, useEffect, useState } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'; //its an end point for registeration in nodeJS course API Project

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  // for user name
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // for password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // for match Password
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //Error handling

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // setting focus when the component load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // checking reults for user name
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log('user: ', user);
    console.log('user result: ', result);

    setValidName(result);
  }, [user]);

  // checking reults for password and match password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log('pwd: ', pwd);
    console.log('pwd result: ', result);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with some hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      //its same as doing post req using postman
      // Syntax, axios.post(URL, payload/Data, headers)
      //   In axios you do not have manullay to convert the reponse into JSOn as we do in fetch. It is automatically converted to json
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(
          { user, pwd },
          {
            headers: {
              'Content-Type': 'application/json',
              withCrendentials: true,
            },
          }
        )
        //here we are doing JSON.stringify({ user, pwd })  as our backend is expecting property user and pwd, In case of
        // userName or password we would do JSON.stringify({ user: userName, pwd:Password })
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      success(true);
      //clear input states
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Resgistration failed!');
      }
      errRef.current.focus();
    }

    console.log(user, pwd);
  };
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive" //when this field will be in focus aria-live will announce to the screen reader
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br /> Must Begin with a letter. <br /> Letters, numbers,
              underscores, hyphens allowed
            </p>

            {/* for password input */}
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            {/* for match password field */}
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
```


# Login and Authentication with axios
Login is very simple you just have to create a login form, integrate it with axios.post in submitHandler function and get the response and save your response in global Auth object using useContext.


first of all create a context folder in src folder and create AuthProvider.js
```bash
//In AuthProvider.js
import { createContext, useState } from 'react';

//its a global state of our app
const AuthContext = createContext({});
// its kind of a custom hook
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

### here we have two things:
1) AuthContext (will use individually, In file where we either want to access the global state or want to update the global state. currently the global state is an empty object
2) AuthProvider (will be used on the top of our app so that its state or you can say values will be available throughout our app)

```bash
//Create a hooks folder inside src folder and create useAuth.js file
//In useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
```
This custom hook is just to eliminates some steps like we always do import useContext and our AuthContext just to eleminate these repetative import we are making this custom hook. There is no other reason.

```bash
//In Login.js
import { useRef, useEffect, useState } from 'react';
import axios from './api/axios';
import useAuth from './hooks/useAuth'

const LOGIN_URL = '/auth'; //endpoint in backend
const Login = () => {
  const { setAuth } = useAuth()
  //here once we have successfully logged in we will save our state in global state in AuthContext using setAuth and useContext
  const userRef = useRef(); //for focus on fields
  const errRef = useRef(); //for focus on errors

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); //helpful for routing

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // here e event argument is automatically generate by javascript we do not have to explicitly provide it.
    console.log(user, pwd);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken }); //storing all our information in global auth Object so that we can access them anywhere in the app.
      setUser(''); //clearing the states after submitting the form
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>
            You are logged In!
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </h1>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={[pwd]}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* put your router link here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
```


# Protected Routes and authorization (Role based routes access)

There are some important files while implementing React Router 6 for routing. Protected Routes, Authorized user. The concept of children and Layout is very important for this.
firt of all set up install react-router-dom as 
```bash
> npm install react-router-dom@6
```

Now you have to make its setup
```bash
Important files are:
Index.js
Layout.js
App.js
RequireAuth.js
UnAuthorized.js
```
```bash
//In index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// The main key here is to wrap App component as an element for Route inside <Routes>
```

```bash
// In Layout.js
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
```
This is a generic layout. A layout can be wrap on as many routes. Here Outlet will render the respective routes its like a placeholder. It is used as an element in parent route and will render all its child components on respect routes

```bash
// Create RequireAuth.js component in components folder
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  //here by using this "state={{from : location}} replace" we are making our browser to the location where the user is coming from.
  // for example for unauthorized user he will be directed to login page if he try to access the protected routes. Now from login page
  // If he press back button then he should go back the page from he was coming from.
};

// here auth?.roles?.find((role) => allowedRoles?.includes(role)) "role" is the each role in "roles" array coming from backend and comparing each value by looping over
// allowedRoles (array which we will provide)
export default RequireAuth;
```
Here you have noticed that we are controlling components. The basic logic is that if the user is authorized then navigate it to the route where he wants to go. If he is not authorized then navigate it to unauthorized and he is not even logged in then navigate it to the login page.
here the useAuth custom hook is very important as this hook contains the global context and contains the information of our user incase the user has logged in.

Here in this component the we are checking that our "auth" state contains a role? if yes then navigate it to Outlet. Here Outlet will show a component around which the RequireAuth component is wrapped.

// here our RequireAuth component accept an object of roles as props
```bash
// UnAuthorized.js
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
//   -1 is to go back 1 step in the browsing history

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
```
This page will be navigated when the user is unauthorized.

```bash
// In App.js
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
    
        {/* Routes we want to protect */}
        {/* only user with 2001 id will be allowed to access Home route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
          {/* we can put as many paths we want here */}
        </Route>

        {/* only user with 1984 id will be allowed to access Editor route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        {/* only user with 5150 id will be allowed to access Admin route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* only user with 1984, 5150 id will be allowed to access Lounge route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
```

- here first there is parent route which contains our <Layout> this will always render
- then we have route component for public route
- then we have protect routes which we want to give access only to specifc users on the basis of their roles.

```bash
Syntax:
<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<AnyComponent />} />
</Route>
```

//here RequireAuth is basically an Outlet renderer. So in RequireAuth.js we are making a logic to render a respective component if the role is included in the object passed as props and the user coming from the database. In short the RequireAuth element will be wrap on the component which components we want to protect.

### Other components
```bash
//In Admin.js
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
```
```bash
//In Editor.js
import { Link } from 'react-router-dom';

const Editor = () => {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Editor;
```
```bash
//In Home.js
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate('/login');
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
```
```bash
//In LinkPage.js
import { Link } from 'react-router-dom';

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to="/editor">Editors Page</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;
```
```bash
//In Lounge.js
import { Link } from "react-router-dom"

const Lounge = () => {
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge;
```
```bash
//In Missing.js
import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing;
```

# AUthentication and authorization with JWT Theory

## Method 1: (Your backend only contains access Token)
If your backend only contains the concept of access token. Then the concept is simple. A user logged in on ABC.com and get a JWT token. The frontend will get access to the user on the basis of the response coming from the backend. If the response is 200 OK then he will be allowed to get access to his profile otherwise will be navigated to his login profile.
Now once the user get logged in. Now he further wants to access some protected routes now he will again make an API request. using Axios.get then he will have to send his JWT token in the headers to the backend to get verified and get access to the protected route.

There are 3 ways to do it.
1) Manually Entering the JWT Token stored in Redux or contextAPI store/State
```bash
axios.get(`${URL}/abc`, {headers:{ Authorization: `Bearer ${ACCESS_TOKEN}`}}
```

Here you will have to manually enter JWT token in the headers for all request where it is needed.

2) Making a global interceptor of axios. (You can make this instance in any file and then import it)
//Lets first understand what are interceptors.
Interceptors are like middleware. There are two types of interceptor.
   1) Request interceptors (These interceptors can be used to change the body before sending the request)
   2) Response interceptors (These interceptors can be used to change the response body)

```bash
axios.interceptors.request.use(
config => {
	config.headers.authorization = `Bearer ${ACCESS_TOKEN}`
	return config
},
error => {
	return Promise.reject(error)
}
)
```

here config is a body coming from the url is making request, you can give anyname but std is config with req interceptor. As in standard for response interceptors we use response.
Now we have created a global instance which will automatically add the access or JWT token in the headers on all requests the user made from front end by only using 
```bash
axios.get(`${URL}/abc`). 
```

But there is a problem. The problem is that now on each request this interceptor (middleware) will add the JWT token in headers before making the each and every request. We do not want that in this way we are sending our Token in the header to every server where we do not might want to send. We should send it to specific routes only. 
For that there is 3rd and most recommended way is given below:
3) Making a private instance of axios interceptor

```bash
//In anyfile.js

const authAxios = axios.create({
baseURL: URL,
headers:{Authorization:`Bearer ${ACCESS_TOKEN}`}
})
```
```bash
//file where you want to make request

Import authAxios from './path'
// now we will do authAxios.get on the routes where we want to send our Token instead of using axios.get
authAxios.get('/abc')
// no need give the URL/abc as we have set the baseUrl to URL so only enter the /abc
//Now on only making get request on route /abc the token will be added to the headers and will be send to the backend.
```

## Method 2: Your backend contains Access token and Refresh token:
There is also an advance concept called refresh token. The concept is simple. Let say you have logged in on ABC.com you get access token with an expiry time of 10min. After 10min your access token will be expired. Now user have to login again. In this case the backend will send an error to frontend with a status code of either 401 or 403. So handling this error and not to make user log in again without entering his credentials again. The backend right away sends a refresh token to the client and then the client sends back this refresh token to the server showing that he is a valid user and then again backend varifies that refresh token as backend contains a secret_refresh_Token in its .env file and will generate a new access token which will remain valid for next 10 min and will send to the frontend. Now front will store the new token in its cookies and will use it for the future concept. In this way you can make your app more secure by generating new token after every session. Remember the refresh token is generated and a new token is assigned on a specific route not on all routes.
In backend we use middlewares to create the pipeline and in frontend we use interceptors to create this pipeline to automate this whole process.

This all process will be happening in the background. User won't know whats happening in the background

## Implementing Authentication with JWT
We are going to implement the second case in which we have access as well as refresh token
So lets start with creating a hook in hooks dirctory namely useRefreshToken()
```bash
//In useRefresh.js
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
      //here we are returing the prev state and overwriting the old access token with the new one.
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

```

This hook will go to refresh endpoint and get a new access token and will overwrite the previous access with the new one in auth global state
Now create a private axios instance in axios.js
```bash
//In axios.js
import axios from 'axios';
const BASE_URL = 'http://localhost:3500';

export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
  //now this will be attached to the every request made with axiosPrivate instance
});

// Now we will attach interceptors with this axios instance lets create a custom hook for that
```
```bash
// In useAxiosPrivate.js

//This hook is just here to attach the interceptors with the new instance of axios that we created (axiosPrivate)
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //checking authorization headers doesn't exist (means its a first request so adding token to it)
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          console.log("In useAxiosPrivate hook auth?.accessToken: ",auth?.accessToken)
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccesstoken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccesstoken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    // clearing function for removing the interceptors once our job has done
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate; //this hook will return an instance that we created but with attached interceptors
};

export default useAxiosPrivate;
```


This hook will simply return our created private axios instance but with attached request and response interceptors
Request interceptors is used to attached the JWT token in the headers before sending the request.
Response interceptors is used when the access token get expired and user will get 403 error on front end and then this response interceptor will get the access token using useRefresh custom hook and will replace the accesss token with the newAccessToken (coming from useRefresh) in the response headers before sending the response to the user.

Create Users.js in components
```bash
//In Users.js
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    //will be used to cancel the request when the component will be unmount

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log('response.data: ', response.data);
        isMounted && setUsers(response.data);
        // Syntax : Boolean && your logic (means if its true then do this)
      } catch (err) {
        console.log(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    // The below is cleanup function. we are unmounting our component once the task has done.
    return () => {
      isMounted = false; //unmounting the component as the users list has set using setUser
      controller.abort(); // we are cancelling our pending requests
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, id) => (
            <li key={id}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;

```

# Persisting the user
In this concept we are making  the user to stay logged in when he refresh the page. Always remember your refresh token have longer expiry time than accessToken. During the time your refresh token is valid you will be allowed to generate accesstoken on every expiry of accessToken. Once the refresh token has expired you will have to login again.. We are going to add check box for "Trust this device" as a state for Boolean in Localstorage which will be true when the box is check and vice versa. If the box is checked then the user will persist his state on refresh. If the box is unchecked then he will not persist his state he will be navigate to login page.

The logic here is that since we are storing out accessToken in that app state that is auth from useContext. On reloading the auth global object automatically get clear or you can say it becomes an empty object. So when the user in protected route click a reload button the auth object will become empty and then the requireAuth component that is our route protection component will check the data in auth global object, then the data will not be there and the user will be navigate to login page.

So here we can pick a point. By any means if we persist the accessToken in auth Global object then the requireAuth component will not navigate the user to login page. As requireAuth will find some data in auth object instead of having empty object this time.
So lets implement that logic.

create a persistLOgin.js component. This would be basically a wrapper for protected routes

```bash
//In PersistLogin.js
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false); 

    return () => (isMounted = false);
  }, []);

  //the below useEffect is just to track the states
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
```

**NOTE:** 
```bash
!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false); // this is the main logic here. 
```
We are checking that if our auth object do not contains access token (that will happen when either the user is not logged in or he click on reload button and have empty Auth object) and have "Trust thi device" check box is check. Then call our useRefresh hook that will send back the valid RefreshToken to the backend will get a new accessToken and will update our emtpy Auth Object. So on reloading the above useEffect will be called and will update our auth Object. In this way the user will remain on login page until his refresh token do not expires.
Remember if the "Trust thi device" check box is  not checked the auth object will be update and user will be directed to login page.

// Before integrating this login in our App.js let make some other changes
```bash
// In authProvider.js
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
```

//Added some extra states for "Trust this device button"

```bash
//In useRefreshToken.js
//here we are also updating our user Role

import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
```


One last thing is to implement logout functionality
```bash
//Create useLogout.js
import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios('/logout', {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
```
Here we are emptying our global auth object

```bash
//In Home.js
import { useNavigate, Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
```


```bash
//App.js

here we will wrap our protected routes with PersistLogin.js component

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}> //***********here we are wrapping
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
```


# Persisting input value in the form and refracting our code using custom hooks
```bash
//useLocalStorage.js
//This hook is in short will store our given key and value in local storage so can persist it.
import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
    //SSR Next.js 
    if (typeof window === 'undefined') return initValue;

    // if a value is already store 
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    // return result of a function 
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage 
```
```bash
//useInput.js
// This hook is get the value from the input form, get the current value from localstorage and reset the value stored in localstorage to its initial value
import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value)
    }

    return [value, reset, attributeObj];
}

export default useInput 
```

```bash
//useToggle.js
//This hook is used for our toggle box and update its value in local storage.
import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const toggle = (value) => {
        setValue(prev => {
            return typeof value === 'boolean' ? value : !prev;
        })
    }

    return [value, toggle];
}

export default useToggle;
```
Now we are no more using useContext for persisting checkbox state we are using local storage with this hook.
