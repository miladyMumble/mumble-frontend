import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
:root {
  --font-primary: 'Montserrat', sans-serif;
}

.dark {}

.Toastify__progress-bar {}

html {
  ${tw`min-w-[350px] text-base`}
}

body {
  ${tw`font-primary font-normal bg-gray-900 text-gray-100`}
}

h1 {
  ${tw`font-bold	text-5xl	leading-10`}
}

h2 {
  ${tw`font-bold	text-4xl	leading-9`}
}

h3 {
  ${tw`font-semibold	text-3xl	leading-8`}
}

p {}

a {
  ${tw`text-purple-500 hover:text-yellow-500 transition-all duration-300 ease-in`}
  text-decoration: none;
}

.Toastify__progress-bar {
  background-color: #6b8269;
}

.Toastify__toast {
  ${tw`bg-green-900`}
  box-shadow: 0 6px 30px 0 rgba(107, 130, 105 / 0.1), 0 -4px 25px -1px rgb(107, 130, 105 / 0.1);
}
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;

//312e81
