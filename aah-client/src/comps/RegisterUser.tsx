import type { JSX } from "react";
import { insertUser } from "../interactions/ApiInteractions.js";

export default function RegisterUser(): JSX.Element {
  function send(formData: FormData) {
    const name: string | undefined = formData.get("name")?.toString();
    const email: string | undefined = formData.get("email")?.toString();
    if (name && email) {
      insertUser(name, email)
        .then((response) => {
          if (!(response instanceof Number)) {
            window.location.pathname = '/';
          } else {
            const err = response as number;
            alert(`Error during registration: ${err}`);
          }
        })
        .catch(err => alert(`Error while trying to communicate with the server: ${err}`));
    }
  }

  return (
    <form action={send}>
      <h2>Register a new user</h2>
      <label htmlFor="form-name">Name:</label><br/>
      <input type="text" name="name" id="form-name" required></input><br/>
      <label htmlFor="form-email">Email:</label><br/>
      <input type="email" name="email" id="form-email" required></input><br/>
      <button type="submit">Register</button>
    </form>
  );
}