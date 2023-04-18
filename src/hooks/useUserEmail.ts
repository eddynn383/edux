import { useEffect, useState } from "react";
import { getUserEmailByID } from "../utils/tools"; // assuming a function called getUserEmail exists in a separate file to handle the API call

const useUserEmail = (userId: string) => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
        const userEmail = await getUserEmailByID(userId);
        console.log(userId)
        console.log(userEmail)
        setEmail(userEmail);
    };
    fetchUserEmail();
  }, [userId]);

  return {email};
};

export default useUserEmail;