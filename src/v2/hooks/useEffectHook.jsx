import React, { useEffect, useState } from "react";

// UseEffect hook allows us to perform side affects in your components.
function UseEffectHook() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleTimeString());
  const [movies, setMovies] = useState([]);
  const [inputText, setInputText] = useState("");

  const url = "https://api-hub-wasim.vercel.app/movies?page=1&limit=10";

  async function fetchMovies() {
    let response = await fetch(url);
    response = await response.json();
    setMovies(response?.results);
  }

  async function searchMovies() {
    let response = await fetch(
      `https://api-hub-wasim.vercel.app/movies/search?q=${inputText}`,
    );
    response = await response.json();
    setMovies(response?.results);
  }

  useEffect(() => {
    if (movies.length === 0 || inputText.length === 0) {
      fetchMovies();
    }

    let debounceSearch = setTimeout(() => {
      if (inputText.length > 0) {
        searchMovies();
      }
    }, 500);
    return () => {
      clearTimeout(debounceSearch);
    };
  }, [inputText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleTimeString());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>UseEffectHook</h1>

      <div>
        <h3>Date : {dateTime}</h3>

        <div>
          <input
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            placeholder="Search Movies..."
          />
          <div>
            {movies &&
              movies?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#333",
                      color: "white",
                      margin: "10px 0",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <div>Id : {item?.id}</div>
                    <div>Title : {item?.title}</div>
                    <div>Description : {item?.description}</div>
                    <div>Genre : {item?.genre}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseEffectHook;
