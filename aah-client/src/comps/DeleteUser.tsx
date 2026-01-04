import type { JSX } from "react";
import { deleteUser } from "../interactions/ApiInteractions.js";

export default function DeleteUser(): JSX.Element {
  function send(formData: FormData) {
    const id: string | undefined = formData.get("id")?.toString();
    if (id) {
      deleteUser(parseInt(id))
        .then((response) => {
          if (!(response instanceof Number)) {
            window.location.pathname = '/';
          } else {
            const err = response as number;
            alert(`Error during deletion: ${err}`);
          }
        })
        .catch(err => alert(`Error while trying to communicate with the server: ${err}`));
    }
  }

  return (
    <form action={send}>
      <h2>Delete an user by its id</h2>
      <label htmlFor="form-id">ID:</label><br/>
      <input type="number" name="id" id="form-id" required></input><br/>
      <button type="submit">Delete</button>
    </form>
  );
}