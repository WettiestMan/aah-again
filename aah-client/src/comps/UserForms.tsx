import DeleteUser from "./DeleteUser";
import ModifyEmailUser from "./ModifyEmailUser";
import RegisterUser from "./RegisterUser";
import "./UserForms.css";

export default function UserForms() {
  return (
    <div className="forms-container">
      <RegisterUser />
      <ModifyEmailUser />
      <DeleteUser />
    </div>
  )
}