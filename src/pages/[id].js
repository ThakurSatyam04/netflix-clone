import MovieDetails from "@/components/MovieDetails";
import { useState } from "react";

const MovieDetailPage = ({ movie }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const trailerIndex = movie.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  //Fetching URL for the trailer after clicking on play button
  const trailerURL = `https://www.youtube.com/watch?v=${movie.videos?.results[trailerIndex]?.key}`;

  return (
    <div>
      <MovieDetails
        movie={movie}
        showPlayer={showPlayer}
        setShowPlayer={setShowPlayer}
        trailerURL={trailerURL}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  //fetch movies data from TMDB by using API_KEY
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      movie: request,
    },
  };
}

export default MovieDetailPage;
