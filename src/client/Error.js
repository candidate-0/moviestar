import React from "react";
import "twin.macro";

const Error = ({ error }) => (
  <>
    <p>Maybe this technobabble means something to you.</p>
    <pre tw="bg-gray-100 p-4 mt-8 mb-4">{error.toString()}</pre>
  </>
);

export default Error;
