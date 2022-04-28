import tw, { styled, css } from 'twin.macro';

export const Button = styled.button((props: { wallet?: boolean }) => [
  css`
    font-family: "VT323", monospace;
    float: right;
    font-size: 30px;
    padding: 100px;
    border: none;
    margin: 30px;
    font-weight: bold;
    color: white;
    padding: 10px;
    border-radius: 10px;
    text-decoration: none;

    &:hover {
      background: blue;
      transition: 0.3s;
      color: white;
    }
  `,

  props.wallet &&
  css`
      background-color: green;
      
      &:hover {
        background: blue;
        transition: 0.3s;
        color: white;
      }
    `,
]);
