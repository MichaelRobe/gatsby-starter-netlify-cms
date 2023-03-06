import React from "react";
import SimpleReactLightbox from "simple-react-lightbox";

export const wrapRootElement = ({ element }) => (
    <SimpleReactLightbox>{element}</SimpleReactLightbox>
)