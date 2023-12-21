import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from "./utils/api"
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import ExplorePerson from './pages/explore/ExplorePerson'
import PersonDetails from './pages/details/personDetails/PersonDetails'

const App = () => {
    const dispatch = useDispatch()
    const {url} = useSelector((state) => state.home)

    useEffect(() => {
        fetchApiConfig();
        genresCall()
    }, [])

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration')
        .then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            }

            dispatch(getApiConfiguration(url))
        })    
    }

    const genresCall = async () => {
        let endPoints = ['movie', 'tv'];
        const promises = endPoints.map((url) => fetchDataFromApi(`/genre/${url}/list`));
    
        try {
            const results = await Promise.all(promises);
    
            const allGenres = {};
            results.forEach(({ genres }) => {
                genres.forEach((item) => (allGenres[item.id] = item));
            });
    
            dispatch(getGenres(allGenres));
        } catch (error) {
            console.error("Error fetching genre data:", error);
        }
    };
    

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:mediaType/:id" element={<Details />}/>
                <Route path="/search/:query" element={<SearchResult />}/>
                <Route path="/explore/:mediaType" element={<Explore />}/>
                <Route path="/person/popular" element={<ExplorePerson />}/>
                <Route path="/person/:id" element={<PersonDetails />}/>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App