import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import { UserProvider } from "./../UserContext";
import { Container } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    email: null,
    id: null,
  });

  useEffect(() => {
    setUser({
      email: localStorage.getItem("email"),
      id: localStorage.getItem("id"),
    });
  }, []);

  const unsetUser = () => {
    localStorage.clear();

    setUser({
      email: null,
      id: null
    });
  };

  return (
    <Fragment>
        <UserProvider value ={{user,setUser,unsetUser}}>
        <NavBar />
        
       <Container fluid  className="parentCont">          
          <Component {...pageProps} />
        </Container>    
        
        
        <Footer />
        </UserProvider>
      </Fragment>
  );
}

export default MyApp;
