export const adaptVideogame = (videogame) => {
  const platforms = videogame.platforms.map(object => object.platform.name);
  const genres = videogame.genres.map(genre => {
    return {
      id: genre.id,
      name: genre.name,
    }
  });

  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description_raw,
    platforms,
    released: videogame.released,
    image: videogame.background_image,
    rating: videogame.rating,
    genres,
  }
}
