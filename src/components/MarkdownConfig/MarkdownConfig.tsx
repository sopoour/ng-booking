import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import { FC } from 'react';
import styled from 'styled-components';
import fonts from '@app/fonts/fonts';

const MarkdownSettings = styled.div`
  p {
    text-align: justify;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    width: 100%;
    box-sizing: border-box;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  color: ${({ theme }) => theme.colors.fg.default};

  li {
    line-height: 2;
  }

  img {
    width: 100%;
  }

  a {
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline !important;
    }
  }

  h2,
  h3,
  h4 {
    font-family: ${fonts.subheader.style.fontFamily};
    font-weight: 400;
  }

  h1 {
    font-size: 36px;
    font-weight: 400;
    font-family: ${fonts.header.style.fontFamily};
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 18px;
  }

  img {
    height: unset;
  }

  .side-by-side {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }

  ${({ theme }) => theme.media('sm')`
      h1 {
        font-size: 48px;
      }
      h2 {
        font-size: 36px;
      }
      h3 {
        font-size: 28px;
      }
      h4 {
        font-size: 20px;
        margin-bottom: -8px;
      }

      img {
        height: auto;
        width: 100%;
        object-fit: cover;
      }

       p {
        font-size: 18px;
      }

      .side-by-side {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap:40px;
        align-items: center;
        margin: 0 auto;

        
      }

      .side-by-side-reverse {
      grid-template-columns: 1fr 1.5fr;
        > span:first-child {
            order: 2;
        }
        > span:nth-child(2) {
            order: 1;
        }
      }
    `}
`;

type Props = {
  content: string;
  className?: string;
};

const MarkdownConfig: FC<Props> = ({ content, className }) => {
  const LinkRenderer = (props: any) => (
    <a href={props.href} target="_blank" aria-label={`Link to ${props.href}`}>
      {props.children}
    </a>
  );

  return (
    <MarkdownSettings className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        skipHtml={false}
        components={{ a: LinkRenderer }}
      >
        {content}
      </Markdown>
    </MarkdownSettings>
  );
};

export default MarkdownConfig;
