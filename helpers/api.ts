import { defaultError } from 'helpers/constants'
import { FeatureType } from 'types/index'

export const getApiUrlBy = (type: string, postcode: string = "", limit: number = 600) => {
  let url = `https://api.hamburg.de/datasets/v1/abfall_recycling/collections/${type}/items?bulk=false&f=json`

  if (limit) {
    url+= `&limit=${limit}`
  }

  if (postcode) {
    url += `&PLZ=${postcode}`
  }

  return url
}

export const fetchData = async (
  apiUrl: string,
  options: {
    onReject: (error: string) => void
    onResolve: (features: Array<FeatureType>) => void
  },
) => (
  await fetch(apiUrl)
    .then(res => res.json())
    .then((data) => options.onResolve(data?.features || []))
    .catch(() => options.onReject(defaultError))
)
