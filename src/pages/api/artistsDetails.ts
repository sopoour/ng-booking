import { fetchGraphQL } from '@app/lib/api';
import { getLocaleFromRequest } from '@app/lib/getLocalFromRequest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getArtistsDetails(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locale = getLocaleFromRequest(req);
    const data = await fetchGraphQL(
      `query artistsDetails($locale: String!) {
            artistCollection(limit: 100, locale: $locale) {
              items {
                name
                genre
                artistRadio {
                 url
                }
                availability
                epkLink
                liveLink
                riderLink
                liveFoto {
                  url
                  width
                  height
                  title
                  description
                }
                presseFoto {
                  url
                  width
                  height
                  title
                  description
                }
                pressetext
                soMeLinks
              }
            }
        }`,
        { locale }
    );

    res.status(200).json(data.data.artistCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
