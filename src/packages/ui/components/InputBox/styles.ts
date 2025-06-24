import styled, { css } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

const sizeStyles = {
  large: css`
    font-size: ${fonts.large};
    height: 40px;
  `,
  regular: css`
    font-size: ${fonts.regular};
    height: 30px;
  `,
  small: css`
    font-size: ${fonts.small};
    height: 20px;
  `,
  login: css`
    font-size: ${fonts.regular};
    height: 30px;
    width: 96%;
  `,
};

const placeholderStyles = {
  large: css`
    font-size: ${fonts.large};
  `,
  regular: css`
    font-size: ${fonts.regular};
  `,
  small: css`
    font-size: ${fonts.small};
  `,
  login: css`
    font-size: ${fonts.regular};
  `,
};

export const DefaultInput = styled.input<{
  size: "large" | "regular" | "small" | "login";
}>`
  background-color: ${colors.offWhite};
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  padding: 9px;
  width: 98%;
  ${({ size }) => sizeStyles[size]}

  ::placeholder {
    ${({ size }) => placeholderStyles[size]}
    color: ${colors.blueGray};
  }

  &::-webkit-input-placeholder {
    ${({ size }) => placeholderStyles[size]}
    color: ${colors.blueGray};
  }

  @media (max-width: 1100px) {
    width: 97%;
    height: 50px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    height: 45px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;

export const InputTitle = styled.span<{
  size: "large" | "regular" | "small" | "login";
}>`
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: ${metrics.smallPadding};
  ${({ size }) => sizeStyles[size]}

  @media (max-width: 1100px) {
    font-size: ${fonts.regular};
  }
`;
