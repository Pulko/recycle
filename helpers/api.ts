export const getApiUrl = (type: String) => (
  `https://api.hamburg.de/datasets/v1/abfall_recycling/collections/${type}/items?limit=100&offset=0&bulk=false&f=json`
)