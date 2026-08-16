import React, { FC } from 'react';
import Head from 'next/head';

export type ContentType = 'website' | 'article';

type Props = {
  title?: string;
  type?: ContentType;
  description?: string | undefined;
  children?: Array<React.ReactNode> | React.ReactNode;
};

const SeoHead: FC<Props> = ({
  title = 'NG-Booking',
  description = 'Booking Agentur für kleine Artists',
  type = 'website',
  children,
}) => {
  const metaImage = 'https://ng-booking.de/og.png';

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.svg" />
      <meta charSet="utf-8" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta key="description" name="description" content={description} />
      <meta key="name" itemProp="name" content={title} />
      <meta key="description-prop" itemProp="description" content={description} />
      <meta key="image" itemProp="image" content={metaImage} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:image" property="og:image" content={metaImage} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:site_name" property="og:site_name" content={title} />
      {children}
    </Head>
  );
};

export default SeoHead;
