import React from "react";
import tw from "twin.macro";

const Header = tw.h2`
  my-4
  text-2xl font-bold
`;

const Content = ({ title, children }) => {
  return (
    <div tw="bg-white border border-gray-200 overflow-hidden shadow-xl rounded-lg">
      <div tw="border-b border-gray-200 px-4 sm:px-6">
        <Header>{title}</Header>
      </div>

      <div tw="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};

export default Content;
