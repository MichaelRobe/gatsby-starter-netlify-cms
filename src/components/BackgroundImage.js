import * as React from "react";
import PropTypes from "prop-types";
import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = (props) => {

    const {
        img,
        title
      } = props;


  return (
    <BackgroundImage
      fluid={img}
      backgroundColor={`#040e18`}
    >
      <h2>{title}</h2>
    </BackgroundImage>
  )
}

BackgroundSection.propTypes = {
    img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
  };

export default BackgroundSection