import { fetchGraphQL } from '@app/lib/api';
import { getLocaleFromRequest } from '@app/lib/getLocalFromRequest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getHomepage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locale = getLocaleFromRequest(req);
    const data = await fetchGraphQL(
      `query homePage($locale: String!) {
          generell(id: "6USnkxDxNcPwJMDWNGDATK", locale: $locale){
            konzertTitel
            konzertUntertitel
            vergangeneKonzertTitel
          }
            artistCollection(limit: 100, locale: $locale) {
              items {
                name
                orderNumber
                profilfoto {
                  url
                  width
                  height
                  title
                  description
                }
                artistRadio {
                 url
                }
                genre
              }
            }
            konzertCollection(limit: 100, locale: $locale) {
              items {
                location
                venue
                artistName
                datum
                ticketLink
                ticketNote
                hoverPicture {
                  url
                }
              }
              
            }
        }`,
        { locale }
    );

    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
