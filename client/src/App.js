import React, { useState } from "react";
import CreateAccountForm from './components/profile_management/CreateAccountForm';
import NavbarComponent from "./components/NavbarComponent";
import EditProfileComponent from "./components/profile_management/EditProfileComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from "./utils/AuthService"
import PrivateRoute from "./components/PrivateRoute";
import CreateBookForm from "./components/book_management/CreateBookForm";
import BookDetailsForm from "./components/book_management/BookDetailsForm";
import BooksByAuthor from "./components/book_management/BooksByAuthor";
import WishList from "./components/WishList/WishList";

function App() {
    // Null until we make the default page.
    const [userDetails, setUserDetails] = useState(null);
    const [wishList, setWishList] = useState([]);

    function handleSetUserDetails(user){
        setUserDetails(user);
    }

    function handleWishListChange(book){
        console.log(book);
        setWishList([...wishList, book]);
    }

    return (
        <Router>
            <NavbarComponent wishList={wishList}/>
            <Route path="/register" component={CreateAccountForm}/>
            <Route path="/CreateBookForm" component={CreateBookForm}/>
            <Route path="/BooksByAuthor" component={BooksByAuthor}/>
            <Route path="/BookDetailsForm" component={() => <BookDetailsForm wishListChange={handleWishListChange} ></BookDetailsForm>}/>
            <PrivateRoute path="/editProfile" component={() => <EditProfileComponent userEmail={Auth.getProfile().username}/>}/>
            <PrivateRoute path="/WishList" component={() => <WishList userEmail={Auth.getProfile().username}/>}/>
        </Router>
    );
}

export default App;
