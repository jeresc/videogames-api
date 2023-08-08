export const mergeApiRequests = async (urls) => {
  let result = Promise.all(
    urls
      .map(url => fetch(url).then(response => response.json()).then(data => data.results))
  ).then(data => data.flat());

  return result;
};
