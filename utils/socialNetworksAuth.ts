import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import useAuthStore from "../store/authStore";
import { IUser } from "./types";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEIUak6aPm1SogmGYanVLO098uUFNwnEo",
  authDomain: "nextvid-cdd30.firebaseapp.com",
  projectId: "nextvid-cdd30",
  storageBucket: "nextvid-cdd30.appspot.com",
  messagingSenderId: "703630324286",
  appId: "1:703630324286:web:51e7a65ab51b8403da976f",
  measurementId: "G-B4S8D2LE6X",
};

const socialNetworksAuth = async (type: string, setUser: any) => {
  const app = initializeApp(firebaseConfig);
  let provider = new FacebookAuthProvider();
  if (type == "facebook") provider = new FacebookAuthProvider();
  if (type == "google") provider = new GoogleAuthProvider();
  if (type == "twitter") provider = new TwitterAuthProvider();

  provider.setCustomParameters({
    display: "popup",
  });

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result: any) => {
      // The signed-in user info.
      const user = result.user;
      console.log(result);

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = result.user.accessToken;
      console.log(accessToken);
      return accessToken;
    })
    .then((accessToken) => {
      const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log(accessToken);
      axios
        .post(
          `${BE_URL}/auth/${type}`,
          { accessToken },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-type": "application/json",  
            },
          }
        )
        .then((res) => {
          console.log(res);
          const user: IUser = {
            id: res.data.id,
            username: res.data.username,
            full_name: res.data.full_name,
            avatar: res.data.avatar,
            accessToken: res.data.accessToken,
            follows: res.data.follows,
            blogs: res.data.blogs,
          };
          setUser(user);
        });
    })
    .catch((error) => {
      console.log(error)
      return null;
    });
};

export default socialNetworksAuth;
