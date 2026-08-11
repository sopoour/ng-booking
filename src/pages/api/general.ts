import { fetchGraphQL } from '@app/lib/api';
import { getLocaleFromRequest } from '@app/lib/getLocalFromRequest';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getHomepage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const locale = getLocaleFromRequest(req);
    const data = await fetchGraphQL(
      `query homePage($locale: String!) {
            generell(id: "6USnkxDxNcPwJMDWNGDATK", locale: $locale) {
              ngRadio {
                url
              }
        }
        }`,
        { locale }
    );

    res.status(200).json(data.data.generell);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
