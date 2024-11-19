import { useEffect, useState } from "react";
import { getRandomAvatar } from "../../../api/users";

const Avatar = () => {
  const [avatarImage, setAvatarImage] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = await getRandomAvatar();
        setAvatarImage(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div className="text-center p-2">
      {avatarImage ? (
        <img src={avatarImage} alt="Avatar Image" className="w-[50px] h-[50px] cursor-pointer rounded-[50%] border border-white"/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Avatar;
