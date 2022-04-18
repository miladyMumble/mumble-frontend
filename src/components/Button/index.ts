import tw, { styled, css } from 'twin.macro';

export const Button = styled.button((props: { wallet?: boolean }) => [
  css`
    ${tw`block text-sm font-semibold px-5 py-4 text-center transition-all duration-700 hover:shadow-md whitespace-nowrap`}
    line-height: 1.06rem;
    &:hover {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
  `,

  props.wallet &&
    css`
      background-color: #6b8269;
      background-size: 400%;
      

      &:hover {
        background-size: 200%;
        background-position: right center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }
    `,
]);
