import { useState, Fragment, useContext, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import './login.css';


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
  }, [])

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

    <main className='container mainContainer m-0 w-100'>
      <div>
          <img src={reactLogo} classNamelogo alt="React logo" />
      </div>
      <div className='titleContainer'>
        <div>Login</div>
      </div>
      <br />
      <div className={`inputContainer row justify-content-center align-self-center`}>
        <div className="col">
          <input
            value={username}
            placeholder="Enter your username here"
            onChange={(ev) => setUsername(ev.target.value)}
            className={`inputBox from-control form-control-lg`}
          />
          <label ></label>
        </div>
      </div>
      <br />
      <div className={`inputContainer row justify-content-center align-self-center`}>
        <div className="col">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={`inputBox from-control form-control-lg `}
            type='password'
          />
          <label></label>
        </div>
      </div>
      <br />
      <div classNameinputContainer>
        <input className='inputButton' type="submit" onClick={btnLoginHandler} value={'Log in'} />
      </div>



      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={actionSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">Credential not found.</Alert>
      </Snackbar>
    </main>

  )
}

export default Login
