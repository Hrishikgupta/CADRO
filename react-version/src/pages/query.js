import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MapApiHeader from "../components/map-api-header"
import useScript from "../hooks/useScript";

const QueryPage = () => {
  useScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
  useScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
  useScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
  useScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");
  useScript("/js/modals.js");
  useScript("/js/mapping.js");
  useScript("/js/query.js");
  useScript("/js/co2.js");
  return (
  <Layout>
    <SEO title="EcoRoute – Your search query" />
    <MapApiHeader />
  </Layout>
)}

export default QueryPage