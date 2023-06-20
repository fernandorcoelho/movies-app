import React from 'react';

import Badge from 'components/Badge';
import { MovieDetailsResponseDTO } from 'interfaces/movieDetailsResponseDTO';
import { formatCurrency } from 'utils/formatCurrency';
import { formatDate } from 'utils/formatDate';
import { formatTime } from 'utils/formatTime';
import { getLanguage } from 'utils/getLanguage';
import { getPosterSrc } from 'utils/getPosterSrc';
import { getStatus } from 'utils/getStatus';
import { getVideoSrc } from 'utils/getVideoSrc';
import { getVoteAveragePercentage } from 'utils/getVoteAveragePercentage';

import * as S from './styles';

const IMAGE_WIDTH = 500;

const MovieDetails: React.FC<MovieDetailsResponseDTO> = ({
  title,
  release_date,
  overview,
  status,
  original_language,
  runtime,
  budget,
  revenue,
  genres,
  poster_path,
  vote_average,
  videos,
}: MovieDetailsResponseDTO) => {
  console.log(getVideoSrc(videos?.results[0].key));

  return (
    <S.Conatiner>
      <S.ContentConatiner>
        <S.Header>
          <S.Title>{title ?? 'Título não encontrado'}</S.Title>
          <S.ReleaseDate>{formatDate(release_date)}</S.ReleaseDate>
        </S.Header>

        <S.Body>
          <S.DetailsContainer>
            <S.SectionContainer>
              <S.SectionTitle>Sinopse</S.SectionTitle>
              <S.Overview>{!!overview ? overview : 'Sinópse não encontrada'}</S.Overview>
            </S.SectionContainer>

            <S.SectionContainer>
              <S.SectionTitle>Informações</S.SectionTitle>
              <S.Table>
                <S.TableCell>
                  <S.TableHeaderCell>Situação</S.TableHeaderCell>
                  <S.TableItem>{getStatus(status)}</S.TableItem>
                </S.TableCell>
                <S.TableCell>
                  <S.TableHeaderCell>Idioma</S.TableHeaderCell>
                  <S.TableItem>{getLanguage(original_language)}</S.TableItem>
                </S.TableCell>
                <S.TableCell>
                  <S.TableHeaderCell>Duração</S.TableHeaderCell>
                  <S.TableItem>{formatTime(runtime)}</S.TableItem>
                </S.TableCell>
                <S.TableCell>
                  <S.TableHeaderCell>Orçamento</S.TableHeaderCell>
                  <S.TableItem>{formatCurrency(budget)}</S.TableItem>
                </S.TableCell>
                <S.TableCell>
                  <S.TableHeaderCell>Receita</S.TableHeaderCell>
                  <S.TableItem>{formatCurrency(revenue)}</S.TableItem>
                </S.TableCell>
                <S.TableCell>
                  <S.TableHeaderCell>Lucro</S.TableHeaderCell>
                  <S.TableItem>{formatCurrency(revenue - budget)}</S.TableItem>
                </S.TableCell>
              </S.Table>
            </S.SectionContainer>

            <S.Footer>
              <S.BadgesContainer>
                {genres?.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </S.BadgesContainer>

              <S.VoteAverageContainer>
                <S.VoteAverageWrapper>
                  <S.VoteAverageText>{getVoteAveragePercentage(vote_average)}</S.VoteAverageText>
                </S.VoteAverageWrapper>
              </S.VoteAverageContainer>
            </S.Footer>
          </S.DetailsContainer>

          {!!poster_path ? (
            <S.Image src={getPosterSrc(IMAGE_WIDTH, poster_path)} />
          ) : (
            <S.ImageNotFound>
              <S.ImageNotFoundText>Imagem não encontrada</S.ImageNotFoundText>
            </S.ImageNotFound>
          )}
        </S.Body>
      </S.ContentConatiner>

      {videos?.results[0]?.key && (
        <iframe
          width="100%"
          height="500"
          title="video"
          src={`https://www.youtube.com/embed/${getVideoSrc(videos?.results[0]?.key)}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </S.Conatiner>
  );
};

export default MovieDetails;
