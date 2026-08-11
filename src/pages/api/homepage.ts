import { fetchGraphQL } from '@app/lib/api';
import { getLocaleFromRequest } from '@app/lib/getLocalFromRequest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getHomepage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locale = getLocaleFromRequest(req);
    const data = await fetchGraphQL(
      `query homePage($locale: String!) {
            artistCollection(limit: 100, locale: $locale) {
              items {
                name
                orderNumber
                profilfoto {
                  url
                  width
                  height
                  title
                }
                artistRadio {
                 url
                }
                genre
              }
            }
        }`,
        { locale }
    );

    console.log(data)

    res.status(200).json(data.data.artistCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
