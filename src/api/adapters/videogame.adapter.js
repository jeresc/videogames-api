export const adaptVideogame = (videogame) => {
try {
  const platforms = videogame.platforms.map(object => object.platform.name);
  const image = videogame?.background_image?.replace("/media/", "/media/crop/600/400/")
  const genres = videogame?.genres?.map(genre => {
    return {
      id: genre.id,
      name: genre.name,
    }
  })

  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description_raw,
    platforms,
    released: videogame.released,
    rating: videogame.rating,
    image: image,
    genres: genres,
  }
  } catch (error) {
    console.log(videogame)
    return {
      id: videogame.id,
      name: videogame.name,
      rating: videogame.rating,
      released: videogame.released,
      platforms: [],
      genres: [],
    }
  }
}
