import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const PaintingPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <GatsbyImage
              image={image.childImageSharp.gatsbyImageData}
            />
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <div className="tags are-medium">
                  {tags.map((tag) => (
                    <Link key={tag + `tag`} className="tag is-primary" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

PaintingPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const PaintingPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout forceHeader={true}>
      <PaintingPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.featuredimage}
      />
    </Layout>
  );
};

PaintingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default PaintingPage;

export const pageQuery = graphql`
  query PaintingPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 100
              layout: FULL_WIDTH
            )

          }
        }
      }
    }
  }
`;
