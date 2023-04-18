import Chip from "@/components/Chip"
import { useEffect, useState } from "react";

const ApiCall = ({api, data}:any) => {

    const [ email, setEmail ] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const currentUser = await getCurrentUser(data);
          setEmail(currentUser?.email);
        //   console.log("***** CURRENT USERS *****")
        //   console.log(currentUser)
        };
        fetchData();
    }, []);


    const getCurrentUser = async (id: string) => {
        console.log(id)
        console.log(api)
        try {
            const res = await fetch(`${api}`, { method: 'GET' })
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("***** CURRENT USER *****")
            const { email }:any = res.json();
            console.log(email)
            return email
        } catch (error) {
            console.error('Error getting the user:', error);
        }
    }

    return (
        <div>
            <Chip data={email} />
        </div>
    )
}

export default ApiCall