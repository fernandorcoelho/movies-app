import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Feedback from 'components/Feedback';
import Loading from 'components/Loading';
import MovieDetails from 'components/MovieDetails';
import { MovieDetailsResponseDTO } from 'interfaces/movieDetailsResponseDTO';
import { api } from 'services/api/axiosClient';
import { Container } from 'styles/MovieDetailsPage';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsResponseDTO>(
    {} as MovieDetailsResponseDTO,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response: MovieDetailsResponseDTO = await api.get(`/movie/${id}`, {
        params: {
          language: 'pt-BR',
          append_to_response: 'videos',
        },
      });

      setMovieDetails(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (error) {
    return (
      <Feedback>
        Um erro inesperado ocorreu!
        <br />
        {error}
      </Feedback>
    );
  }

  return (
    <Container>
      {!movieDetails && !loading && <Feedback>Nenhum resultado foi encontrado</Feedback>}

      {loading ? (
        <Loading>Carregando filme...</Loading>
      ) : (
        <MovieDetails
          title={movieDetails?.title}
          release_date={movieDetails?.release_date}
          budget={movieDetails?.budget}
          genres={movieDetails?.genres}
          original_language={movieDetails?.original_language}
          overview={movieDetails?.overview}
          poster_path={movieDetails?.poster_path}
          revenue={movieDetails?.revenue}
          runtime={movieDetails?.runtime}
          status={movieDetails?.status}
          videos={movieDetails?.videos}
          vote_average={movieDetails?.vote_average}
        />
      )}
    </Container>
  );
};

export default MovieDetailsPage;
