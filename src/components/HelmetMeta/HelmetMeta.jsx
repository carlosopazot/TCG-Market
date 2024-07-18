import { Helmet } from "react-helmet-async";

const HelmetMeta = ({ title, content }) => {
  return (
    <Helmet>
      <title>{`${title} - Sleeve`}</title>
      <meta name="description" content={content} />
    </Helmet>
  )
}

export default HelmetMeta;