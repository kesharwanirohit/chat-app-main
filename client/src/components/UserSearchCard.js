/**
 * The UserSearchCard component renders a card displaying user information with an avatar and clickable
 * link.
 * @returns The `UserSearchCard` component is being returned. It is a functional component that
 * displays user information in a card format. The component includes an `Avatar` component for
 * displaying the user's profile picture, the user's name, and email. The user's name and email are
 * displayed with ellipsis and line clamping to ensure they don't overflow the container. The component
 * is wrapped in a `
 */
import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
    >
      <div>
        <Avatar
          width={50}
          height={50}
          name={user?.name}
          userId={user?._id}
          imageUrl={user?.profile_pic}
        />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
