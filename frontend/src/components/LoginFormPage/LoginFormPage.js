import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/session";
import styles from "./LoginFormPage.module.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ credential, password }));
    } catch (err) {
      (async () => {
        const { errors } = await err.json();
        setErrors(errors);
      })();
    }
  };

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h3 className={styles.heading}>Login</h3>
      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginFormPage;
