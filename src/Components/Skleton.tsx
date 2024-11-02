import ContentLoader from "react-content-loader";

const Skleton = () => (
<ContentLoader 
speed={2}
width={250}
height={400}
viewBox="0 0 250 400"
backgroundColor="#f3f3f3"
foregroundColor="#ecebeb"

>
<rect x="" y="0" rx="2" ry="8" width="250" height="225" /> 
<rect x="" y="240" rx="2" ry="8" width="150" height="20" /> 
<rect x="" y="270" rx="0" ry="8" width="100" height="20" /> 
<rect x="" y="300" rx="0" ry="8" width="80" height="20" />
</ContentLoader>
);

export default Skleton;
