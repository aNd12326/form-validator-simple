import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setInput((prevState) => {
      // creo mi nuevo estado
      const newState = {
        ...prevState,
        [e.target.name]: e.target.value,
      };

      //   valido los errores de mi nuevo estadoc
      setError(validate(newState));

      //   devuelvo mi nuevo estadoc
      return newState;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.username &&
      input.password &&
      !error.username &&
      !error.password
    ) {
      alert("Bienvenido al bar");
    } else {
      alert("intenta de nuevo");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={input.username}
          className={error?.username && "danger"}
          onChange={handleChange}
        />
        <p className={error?.username && "danger"}>{error.username || ""}</p>
      </div>
      <div>
        <label>password:</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          className={error?.password && "danger"}
        />
        <p className={error?.password && "danger"}>{error.password || ""}</p>
      </div>
      <input type="submit" value="Iniciar sesion" />
    </form>
  );
}

// -----------------otro archivo----------------
export function validate(state) {
  const errors = {};
  if (!state.username) {
    errors.username = "Username is required";
  } else if (!/\S+@\S+\.\S+/.test(state.username)) {
    errors.username = "Username is invalid";
  }

  if (!state.password) {
    errors.password = "Password is required";
  } else if (!/(?=.*[0-9])/.test(state.password)) {
    errors.password = "Password is invalid";
  }

  return errors;
}
