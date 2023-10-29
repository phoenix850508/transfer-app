import React, { useEffect, useState } from "react";
import setting from "icons/undraw_personal_settings_kihd.svg";
import NavbarContainer from "components/container/NavbarContainer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, app } from "utils/firebase";
import Button from "components/buttons/Button";

function MyAccount() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [accountNumber, setAccountNumber] = useState(null);
  const auth = getAuth(app);
  const [username, setUsername] = useState(user.displayName);
  const [previewAvatar, setPreviewAvatar] = useState(
    user.providerData[0].photoURL,
  );
  const [avatar, setAvatar] = useState(null);

  // 儲存上傳的檔案
  const handleAvatarFile = (e) => {
    setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
    setAvatar(e.target.files[0]);
  };

  const handleSaveClick = async () => {
    // 若尚未選取檔案，不動作
    if (!avatar) return;
    const storage = getStorage(app);
    const metadata = {
      contentType: avatar.type,
    };

    // 指定圖片上傳路徑
    const storageRef = ref(storage, `images/${user.uid}`);
    // 上傳圖片到FireStorage
    uploadBytes(storageRef, avatar, metadata).then(() => {
      getDownloadURL(storageRef).then(async (imageUrl) => {
        // 更新forestore資料
        await updateDoc(doc(db, "users", user.uid), {
          name: username,
          photoURL: imageUrl,
        });

        // 更新Auth中profile資料
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: imageUrl,
        });

        // 更新localStorage資料
        user.displayName = username;
        user.photoURL = imageUrl;
        localStorage.setItem("user", JSON.stringify(user));
        alert("profile saved");
      });
    });
  };
  // 從fireStore取得user
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userData = await getDoc(doc(db, "users", user.uid));
        setAccountNumber(userData.data().account_number);
      }
    };
    fetchUser().catch((error) => console.error(error));
  }, [user]);
  return (
    <NavbarContainer>
      <div className="grid sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-3 md:grid-rows-1 sm:gap-5 md:gap-10 sm:mt-5 md:mt-20 m-5">
        <img src={setting} alt="" />
        <div className="col-span-2 row-span-3 sm:p-2 md:p-5 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-6 text-[#64748b]">
          <div className="w-full flex flex-col items-start gap-2">
            <label>User ID</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="user id"
              value={user.uid}
              disabled
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>User name</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Email</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Photo URL</label>
            <img
              className="border-2 p-2"
              src={
                previewAvatar ? previewAvatar : user.providerData[0].photoURL
              }
              alt=""
            />
            <input
              type="file"
              onChange={(e) => {
                handleAvatarFile?.(e);
              }}
            ></input>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Account number</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="account number"
              value={accountNumber}
              disabled
            />
          </div>
          <Button onButtonClick={handleSaveClick} buttonText="save" />
        </div>
      </div>
    </NavbarContainer>
  );
}

export default MyAccount;
