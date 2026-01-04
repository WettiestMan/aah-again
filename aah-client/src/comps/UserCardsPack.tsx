import type { JSX } from "react";
import type { UserType } from "../interactions/UserType";
import UserCard from "./UserCard";
import "./UserCardsPack.css";

export default function UserCardsPack({users}: {users: UserType[]}): JSX.Element {
  return (
    <div className="user-cards-pack">
      {users.map(user => (
        <UserCard user={user} />
      ))}
    </div>
  );
}