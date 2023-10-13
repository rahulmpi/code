import HeroSection from "../components/HeroSection";
import FeatureProduct from "../components/FeatureProduct";
import { realdb } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";


const Home = () => {
 // const [users, setUsers] = useState([]);
  const heroData = {
    name: "thapa store",
  };

  // useEffect(() => {
  //   const query = ref(realdb, "user");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();

  //     setUsers(data)
  //   });
  // }, []);

  return (
    <>
      <HeroSection myData={heroData} />
      {/* {users.map((user, index) => (
        <h1 key={index}>{user.name}</h1>
      ))} */}
      <FeatureProduct />
    </>
  );
};

export default Home;