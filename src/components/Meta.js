import { useState, useEffect } from "react";
import "./Meta.scss";
import { movies$ } from "../movies";
import Card from "./Card";
import Select from "./Select";
import Pagination from "./Pagination";

const Meta = () => {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPetPage] = useState(4);

  // Instantiate categories
  if (categories.length === 0) {
    movies.map((movie) => {
      if (!categories.includes(movie.category)) {
        categories.push(movie.category);
      }
    });
  }

  // Instantiate movies array
  useEffect(() => {
    movies$.then((res) => setMovies(res));
    movies$.then((res) => setFiltered(res));

    if (activeCategory === "All") {
      setFiltered(movies);
      return;
    }
  }, []);

  // Delete clicked card function
  const deleteItemHandler = (movieId, movieCategory) => {
    setFiltered((prevMovies) => {
      const updatedMovies = prevMovies.filter((movie) => movie.id !== movieId);
      return updatedMovies;
    });

    // Remove category from multiselect if not present in current Array
    setCategories(() => {
      const updatedCategories = categories.filter(
        (category) => category !== movieCategory
      );
      return updatedCategories;
    });
  };

  // Change category handler
  const changeCategoryHandler = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      setFiltered(movies);
      return;
    }

    setFiltered(() => {
      const updatedMovies = movies.filter(
        (movie) => movie.category === category
      );
      return updatedMovies;
    });
  };

  // Setting the number of cards per page
  const handlePaginationChange = (pageNumber) => {
    setPostsPetPage(pageNumber);
  };

  // Setting up pagination variables

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  // Change the page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Click on previous action
  const previous = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Click on next action
  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="Meta">
      <Select categories={categories} onChange={changeCategoryHandler} />
      <ul className="movie-list">
        {currentPosts.map((movie, index) => (
          <Card
            id={movie.id}
            title={movie.title}
            category={movie.category}
            img={movie.img}
            likes={movie.likes}
            dislikes={movie.dislikes}
            onDelete={deleteItemHandler}
            key={index}
          />
        ))}
      </ul>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filtered.length}
        onChange={handlePaginationChange}
        paginate={paginate}
        previous={previous}
        next={next}
      />
    </div>
  );
};

export default Meta;
