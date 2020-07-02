import tw from "twin.macro";
import { Link as RouterLink } from "react-router-dom";

const Link = tw(RouterLink)`
  text-red-400
  hover:text-red-700
  transition ease-in-out duration-150
`;

export default Link;
