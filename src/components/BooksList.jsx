import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import LoginAuth from "../layout/LoginAuth";

const BooksList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]); // State to store fetched books

    const handleButtonClick = () => {
        navigate("/");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement your search logic here
        console.log("Search submitted:", searchQuery);
        fetchBooks(searchQuery);
    };

    const fetchBooks = async (query) => {
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
            const booksData = response.data.docs.filter((book) => book.cover_i); // Filter out books without cover images
            setBooks(booksData);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleAddToCart = (book) => {
        // Implement your logic to add the book to the cart
        console.log("Added to cart:", book.title);
        // You can use state or a context API to manage the cart data
    };

    useEffect(() => {
        // Fetch books when the component mounts (initial load)
        fetchBooks(searchQuery);
    }, []); // Empty dependency array to ensure it runs only once

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Books List
            </Typography>
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TextField
                    label="Search Books"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ marginRight: "1rem" }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </form>
  

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {books.map((book, index) => (
                    <div key={index} style={{ margin: "20px", width: "25%", textAlign: "center" }}>
                        <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={`Book cover for ${book.title}`} style={{ width: "100%", height: "200px" }} />
                        <Typography variant="h6">{book.title}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleAddToCart(book)}>
                            Add to Cart
                        </Button>
                    </div>
                ))}


<Button variant="contained" color="primary" onClick={handleButtonClick} sx={{ marginTop: "1rem" }}>
                Go to Home Page
            </Button>   
            </div>
        </Container>
    );
};

export default LoginAuth(BooksList);
