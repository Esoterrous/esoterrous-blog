import gql from "graphql-tag";
import graphClient from "./apolloClient";
import remark from "remark";
import html from "remark-html";

const getPostIds = async () => {
  const { data } = await graphClient.query({
    query: gql`
      query {
        blogs {
          id
          Slug
        }
      }
    `,
  });

  const paths = data.blogs.map((entry) => {
    return {
      params: {
        slug: entry.Slug,
      },
    };
  });

  return paths;
};

const getPostData = async (slug) => {
  const { data } = await graphClient.query({
    query: gql`
      query Blogs($slug: String!) {
        blogs(where: { Slug: $slug }) {
          Title
          Slug
          Published
          Description
          Body
        }
      }
    `,
    variables: { slug },
  });

  const entry = data.blogs[0];
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(entry.Body);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug: entry.Slug,
    title: entry.Title,
    date: entry.Published,
    contentHtml,
  };
};

const getSortedPosts = async () => {
  const { data } = await graphClient.query({
    query: gql`
      query {
        blogs(sort: "Published:desc") {
          Slug
          Title
          Published
        }
      }
    `,
  });

  return data.blogs.map((entry) => {
    return {
      slug: entry.Slug,
      title: entry.Title,
      date: entry.Published,
    };
  });
};

module.exports = {
  getPostIds,
  getPostData,
  getSortedPosts,
};
