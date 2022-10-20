import { defaultError } from 'helpers/constants'

export const getApiUrlBy = (type: string, postcode: string = "", limit: number = 600) => {
  let url = `https://api.hamburg.de/datasets/v1/abfall_recycling/collections/${type}/items?bulk=false`

  if (limit) {
    url+= `&limit=${limit}`
  }

  if (postcode) {
    url += `&PLZ=${postcode}`
  }

  return url
}

export const fetchData = (
  apiUrl: string,
  onError: (error: string) => void,
) => (
  fetch(apiUrl)
    .then(res => res.json())
    .catch(() => onError(defaultError))
)
