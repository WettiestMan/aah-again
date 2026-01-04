import type { JSX } from "react";
import { updateUser } from "../interactions/ApiInteractions.js";

export default function ModifyEmailUser(): JSX.Element {
  function send(formData: FormData) {
    const id: string | undefined = formData.get("id")?.toString();
    const email: string | undefined = formData.get("email")?.toString();
    if (id && email) {
      updateUser(email, parseInt(id))
        .then((response) => {
          if (!(response instanceof Number)) {
            window.location.pathname = '/';
          } else {
            const err = response as number;
            alert(`Error during update: ${err}`);
          }
        })
        .catch(err => alert(`Error while trying to communicate with the server: ${err}`));
    }
  }

  return (
    <form action={send}>
      <h2>Update an user's email by its id</h2>
      <label htmlFor="form-id">ID:</label><br/>
      <input type="number" name="id" id="form-id" required></input><br/>
      <label htmlFor="form-email">Email:</label><br/>
      <input type="email" name="email" id="form-email" required></input><br/>
      <button type="submit">Update</button>
    </form>
  );
}