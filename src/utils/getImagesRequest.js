const apiKey = '20121769-cbac7918c0d6930224b67759a';

const getImagesRequest = async (page) => {
  const request = await fetch(`https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizonal&min_width=1960&page=${page}`);
  const response = await request.json();

  return response;
};

export default getImagesRequest;
