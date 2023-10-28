import React from "react";

function FilterdUsers({
  keyword = "",
  onContactClick,
  users,
  currentUserEmail,
}) {
  const filtered = users.filter((user) => {
    if (keyword.trim().length === 0) {
      return user.email !== currentUserEmail;
    }
    return (
      user.name.toLowerCase().includes(keyword) ||
      user.account_number.includes(keyword) ||
      (user.email.includes(keyword) && user.email !== currentUserEmail)
    );
  });
  return (
    <div>
      {filtered.map((user, index) => {
        return (
          <div
            className="flex flex py-5 sm:gap-2 md:gap-6 hover:bg-[#f3f4f6] cursor-pointer"
            key={index}
            onClick={() => onContactClick?.(user)}
          >
            <img
              className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
              src={user.photoURL}
              alt=""
            />
            <div className="flex flex-col items-start">
              <h1 className="font-semibold text-[#3f3f46]">{user.name}</h1>
              <div className="flex sm:flex-col md:flex-row items-start gap-3 text-[#737373]">
                <span>
                  <strong>Email:</strong>
                  {user.email}
                </span>
                <span>
                  <strong>Account:</strong>
                  {user.account_number}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FilterdUsers;
