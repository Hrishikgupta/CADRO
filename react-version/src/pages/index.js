import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MapImageHeader from "../components/map-image-header"
import About from "../components/about"
import IndexModal from "../components/index-modal"
import useScript from "../hooks/useScript";

const IndexPage = () => {
  useScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
  useScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
  useScript("/js/modals.js");
  useScript("/js/mapping.js");
  useScript("/js/index.js");
  return (
  <Layout subheader={<MapImageHeader />}>
    <SEO title="Home" />
    <About />
    <IndexModal />
  </Layout>
)}

export default IndexPage

