import type { UserType } from "../interactions/UserType";
import './UserCard.css';

export default function UserCard({user} : {user: UserType}) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(user.created_at);

  return (
    <div className="user-card">
      <div className="container">
        <div className="lhs">
          <img src="avatar.png"></img>
        </div>
        <div className="rhs">
          <h2 className="user-card-title">{user.id}: {user.name}</h2>
          <p className="user-card-mail">Email: {user.email}</p>
          <p className="user-card-joined">Joined at: {date.toLocaleDateString('es-PE', dateOptions)}</p>
        </div>
      </div>
    </div>
  );
}