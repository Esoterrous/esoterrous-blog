import Head from "next/head";
import Link from "next/link";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPosts } from "../lib/posts";
import WithGraphQL from "../lib/withGraphql";

export default function Home({ allPostsData }) {
  return (
    <WithGraphQL>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>
            I am a self-taught developer who started learning to program years
            ago to fullfill my own curiosity and make tools to help at work. I
            am now a full time engineer who gets to do what I love for a living
            developing frontend and backend systems that run the largest battery
            factory in the world. This is a blog I started to experiment with
            Next.js and headless CMS, to talk about my personal interests and
            technical thoughts. Starting with nothing fancy to get this out
            there, planning to use this sharpen my UI skills and build fun
            components.
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Posts</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ slug, date, title }) => (
              <li className={utilStyles.listItem} key={slug}>
                <Link href={`/posts/${slug}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </WithGraphQL>
  );
}

export async function getStaticProps() {
  console.log(process.env.LOCAL_GRAPHQL_HOST);
  const allPostsData = await getSortedPosts();

  return {
    props: {
      allPostsData,
    },
  };
}
