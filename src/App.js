import React from 'react';
import { useState, useEffect } from "react";

import Search from "./components/Search";
import Rating from './components/Rating';
import MediaList from './components/MediaList';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import ResultsPerPageDropdown from './components/ResultsPerPageDropdown';
import giphy from './api/giphy';
import customTheme from './customTheme';

import {
  ChakraProvider,
  Box,
  Text,
  Flex,
  Heading,
  Container,
  Image
} from '@chakra-ui/react';

import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

function App() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRating, setActiveRating] = useState("g");
  const [resultsPerPage, setResultsPerPage] = useState(18);
  const [favorites, setFavorites] = useState([]);
  const DEFAULT_GIF_URL = 'https://media3.giphy.com/media/KBJTi1lxDGrfPsl8Hf/giphy.gif?cid=6df103acd0tsdm9t79flyb7m9mletj3qrgvxst8n8q25h5j2&ep=v1_gifs_search&rid=giphy.gif&ct=g';
  const SAD_GIF_URL = 'https://media3.giphy.com/media/d2lcHJTG5Tscg/giphy.gif?cid=6df103ac0e22kt2z6ge334q220gpabf2v81wv890gj2lxqgo&ep=v1_gifs_search&rid=giphy.gif&ct=g'
  const GiphyKey = 'VLlukEW7esTXr7asMjUpSibnHh98vNhp'

  useEffect(() => {
    const storedGifs = localStorage.getItem('gifs') ? JSON.parse(localStorage.getItem('gifs')) : [];
    setFavorites(Object.values(storedGifs));
  }, []);

  const getVideosFromSearch = (term) => {
    setSearchTerm(term);
  }

  const handleRatingClick = (rating) => {
    setActiveRating(rating);
  };

  const handleResultsPerPageChange = (value) => {
    setResultsPerPage(value);
  };

  const handleFavoriteClick = (gifId) => {
    var found = false
    var storedGifs = localStorage.getItem('gifs') ? JSON.parse(localStorage.getItem('gifs')) : [];
    setGifs((prevGifs) =>
      prevGifs.map((gif) => {
        console.log(gif.id)
        if (gif.id === gifId) {
          found = true;
          const isFavorited = !gif.isFavorited;
          if (isFavorited) {
            // copy gif before modification
            var newGif = JSON.parse(JSON.stringify(gif))
            newGif.isFavorited  = true
            storedGifs[gifId] = newGif;
          } else {
            delete storedGifs[gifId]
          }
          localStorage.setItem('gifs', JSON.stringify(storedGifs));
          setFavorites(Object.values(storedGifs))
          return {
            ...gif,
            isFavorited,
          };
        }
        return gif;
      })
    );
    // if not found, gif is not in current search results and click came from favs. remove.
    if (!found) {
      delete storedGifs[gifId]
      localStorage.setItem('gifs', JSON.stringify(storedGifs));
      setFavorites(Object.values(storedGifs))
    }
  };

  // call giphy service when search, rating or result num is updated
  useEffect(()=>{
    const fetchGifs = async () => {
      if (searchTerm) {
        const storedGifs = localStorage.getItem('gifs') ? JSON.parse(localStorage.getItem('gifs')) : {};
        const response = await giphy.get(`gifs/search?api_key=${GiphyKey}&q=${searchTerm}&rating=${activeRating}&limit=${resultsPerPage}`, {timeout: 5000});
        // create gif objects with necessary data
        const gifs = response.data.data.map((gif) => ({
          id: gif.id,
          title: gif.title,
          rating: gif.rating,
          thumb_url: gif.images.fixed_width_small.url,
          source: gif.source,
          source_post_url: gif.source_post_url,
          url: gif.images.downsized.url,
          isFavorited: storedGifs[gif.id] != null, // add isFavorited property
        }));
        setGifs(gifs);
      } else {
        setGifs([])
      }
    };
    fetchGifs()
  },[searchTerm, activeRating, resultsPerPage])

  return (
    <ChakraProvider theme={customTheme}>
      <Flex direction="column" align="center">
        <Box py={2} w="100%">
          <Heading as="h1" size="xl" textAlign="center" mt="10">
            REACT(ION) APP <ColorModeSwitcher justifySelf="flex-end" />
          </Heading>
        </Box>
        <Container maxW="1200px">
          <Router>
            <nav>
              <NavLink exact="true" to="/">Search</NavLink>
              <NavLink exact="true" to="/favorites">Favorites</NavLink>
            </nav>
            <Routes>
              <Route path="/" element={
                <Box textAlign="center" fontSize="xl">
                  <Search keepMounted={true} onSearchBarChange={getVideosFromSearch} />
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    alignItems="center"
                    justifyContent={{ base: "center", md: "space-between" }}
                  >
                      <Rating activeRating={activeRating} onRatingClick={handleRatingClick} />
                      <ResultsPerPageDropdown value={resultsPerPage} onChange={handleResultsPerPageChange} />
                  </Flex>

                  {gifs.length ? (
                    <MediaList gifs={gifs} onFavoriteClick={handleFavoriteClick} />
                  ) : (
                    <Flex justifyContent="center" alignItems="center" mt={8}>
                      <Image src={DEFAULT_GIF_URL} alt="Use the Search" />
                    </Flex>
                  )}
                </Box>
              } keepMounted/>
              <Route path="/favorites" element={
                <Box textAlign="center" fontSize="xl" pt="6">
                  {favorites && favorites.length ? (
                    <MediaList gifs={favorites} onFavoriteClick={handleFavoriteClick} />
                  ) : (
                    <Flex justifyContent="center" alignItems="center" mt={8}>
                      <Box textAlign="center">
                        <Text fontSize="2xl">NO GIFS!</Text>
                        <Image src={SAD_GIF_URL} alt="No Favorites" />
                      </Box>
                    </Flex>
                  )}
                </Box>
              } />
            </Routes>
          </Router>
        </Container>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
