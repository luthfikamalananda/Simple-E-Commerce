import { useState, Fragment, useContext, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import style from './login.module.css';

import Alert from '@mui/material/Alert';
import { Button, Snackbar, useColorScheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (auth.checkLogin() === true) {
      navigate('/products')
    } 
  },[])

  const actionSnackbar = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        CLOSE
      </Button>
    </Fragment>
  );

  const btnLoginHandler = async () => {
    try {
      const consumeLoginAPI = await fetch('https://fakestoreapi.com/auth/login', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      const resultJSON = await consumeLoginAPI.json();
      console.log(resultJSON.token);
      console.log('Login Berhasil');
        localStorage.setItem('credential', JSON.stringify({
          username: username,
          password: password
      }))
      navigate("/products");
      navigate(0)
    } catch (error) {
      console.log('Login GAGAL');
      setOpen(true);
    }
  }

  return (
    <div className={style.mainContainer}>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={style.logo} alt="React logo" />
        </a>
      </div>
      <div className={style.titleContainer}>
        <div>Login</div>
      </div>
      <br />
      <div className={style.inputContainer}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={style.inputBox}
        />
        <label className={style.errorLabel}></label>
      </div>
      <br />
      <div className={style.inputContainer}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={style.inputBox}
        />
        <label className={style.errorLabel}></label>
      </div>
      <br />
      <div className={style.inputContainer}>
        <input className={style.inputButton} type="submit" onClick={btnLoginHandler} value={'Log in'} />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={actionSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">Credential not found.</Alert>
      </Snackbar>
    </div>

  )
}

export default Login
