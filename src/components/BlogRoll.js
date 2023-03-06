import React, {useState} from 'react'
import PropTypes, { node } from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox'

const BlogRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;
  const options = {
    buttons: {
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: false,
      showPrevButton: false,
    },
    thumbnails: {
      showThumbnails: false
    }
  }
  const [types, setTypes] = useState(["Portrait", "Landscape"]);
  const filteredPosts = posts.filter(({ node: post }) => (types.includes(post?.frontmatter?.type)))
  const trimmedPosts = filteredPosts.slice(0, props.displaycount);
  const half = Math.ceil(trimmedPosts.length / 2);
  const firstPosts = trimmedPosts.slice(0, half);
  const secondPosts = trimmedPosts.slice(half);

  return (
    
    <div className="columns is-multiline">
      <div className='column is-12 buttons has-addons is-medium has-text-centered'>
        <button className={`button is-primary   ${types.includes("Portrait") && types.includes("Landscape") ? '' : 'is-outlined'} `} onClick={() => setTypes(["Portrait", "Landscape"])}>All</button>
        <button className={`button is-primary   ${types != "Portrait" ? 'is-outlined' : ''} `} onClick={() => setTypes("Portrait")}>Portrait</button>
        <button className={`button is-primary   ${types != "Landscape" ? 'is-outlined' : ''} `} onClick={() => setTypes("Landscape")}>Landscape</button>
      </div>
      
      <div className="is-parent column is-6 gap">
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            {firstPosts &&
              firstPosts.filter(({ node: post }, index) => (post?.frontmatter?.featuredimage) && (types.includes(post?.frontmatter?.type))).map(({ node: post }) => (
                <Link className='gallery-link' to={post.frontmatter.featuredimage.publicURL} key={post.id}>
                  <article style={{ display: "grid" }} className={` gallery-image ${post.frontmatter.featuredpost ? 'is-featured' : ''}`}>
                  <Link style={{ gridArea: "1/1", display: "grid" }} to={post.fields.slug}> <i style={{ gridArea: "1/1" }} class="fa fa-circle-plus"></i> </Link>
                    <div style={{ gridArea: "1/1" }} className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.featuredimage,
                            alt: post.frontmatter.title,
                            width:
                              post.frontmatter.featuredimage.childImageSharp
                                .gatsbyImageData.width,
                            height:
                              post.frontmatter.featuredimage.childImageSharp
                                .gatsbyImageData.height,
                          }}
                        />
                      </div>
                  </article>
                </Link>            
              ))
            }
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
      <div className="is-parent column is-6 gap">
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
              {secondPosts &&
                secondPosts.filter(({ node: post }, index) => (post?.frontmatter?.featuredimage)  && (types.includes(post?.frontmatter?.type))).map(({ node: post }) => (
                  <Link className='gallery-link' to={post.frontmatter.featuredimage.publicURL} key={post.id}>
                    <article style={{ display: "grid" }} className={` gallery-image ${post.frontmatter.featuredpost ? 'is-featured' : ''}`}>
                    <Link style={{ gridArea: "1/1", display: "grid" }} to={post.fields.slug}> <i style={{ gridArea: "1/1" }} class="fa fa-circle-plus"></i> </Link>
                      <div style={{ gridArea: "1/1" }} className="featured-thumbnail">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: post.frontmatter.title,
                              width:
                                post.frontmatter.featuredimage.childImageSharp
                                  .gatsbyImageData.width,
                              height:
                                post.frontmatter.featuredimage.childImageSharp
                                  .gatsbyImageData.height,
                            }}
                          />
                        </div>
                    </article>
                  </Link>            
                ))}
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
      
    </div>
  )
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function BlogRoll({displaycount}) {
  
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___position] }
            filter: { frontmatter: { templateKey: { eq: "painting-page" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  type
                  position
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
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} displaycount={displaycount}/>}
    />
  );
}
