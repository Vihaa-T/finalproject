import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import ResultPage from '../../components/Result-page';
import PaginationButtons from '../../components/pageComponents/PaginationButtons';
import pageStyles from '../../styles/AnimalResultPage.module.css';

const Slug = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const [isValidRequest, setIsValidRequest] = useState(false);
  const [error, setError] = useState(null);

  const [currentQuery, setCurrentQuery] = useState('');

  useEffect(() => {
    const buildQuery = () => {
      const queryParams = [];

      for (let key in router.query) {
        if (router.query[key] && router.query[key] !== 'any') {
          queryParams.push(`${key}=${router.query[key]}`);
        }
      }

      // Construct query string
      const queryString = queryParams.join('&');
      setCurrentQuery(queryString);
    };

    buildQuery();
  }, [router.query]);

  const fetchPets = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pets?${currentQuery}`);
      if (!response.ok) {
        setIsValidRequest(false);
        setIsLoading(false);
        return;
      }

      const petData = await response.json();

      // Handle empty results
      if (petData.length === 0) {
        setIsValidRequest(false);
        setResults([]);
        setIsLoading(false);
        return;
      }

      setData(petData);
      setResults(petData);
      setIsValidRequest(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to fetch pets. Please try again later.');
      setIsLoading(false);
    }
  };

  // Fetch data whenever the query changes
  useEffect(() => {
    if (currentQuery) {
      fetchPets();
    }
  }, [currentQuery]);

  const handleNextPageChange = () => {
    const nextOffset = parseInt(router.query.offset || 0) + 10;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, offset: nextOffset },
    });
  };

  const handlePreviousPageChange = () => {
    const prevOffset = Math.max(0, parseInt(router.query.offset || 0) - 10);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, offset: prevOffset },
    });
  };

  if (!isValidRequest && !isLoading) {
    return (
      <div>
        <h1 className={pageStyles.searchResultHeader}>
          No pets found. Please adjust your search criteria.
        </h1>
        <AnimalInputField />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1 className={pageStyles.searchResultHeader}>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <AnimalInputField />
      <h1 className={pageStyles.searchResultHeader}>Pets matching your search:</h1>
      <ResultPage results={results} />
      <PaginationButtons
        data={data}
        handleNextPageChange={handleNextPageChange}
        handlePreviousPageChange={handlePreviousPageChange}
      />
    </div>
  );
};

export default Slug;
