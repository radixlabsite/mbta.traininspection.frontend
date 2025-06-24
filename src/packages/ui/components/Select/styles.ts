import styled, { css } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

interface SelectProps {
  $size?: string;
}

export const SelectInput = styled.select<SelectProps>`
  display: flex;
  width: 100%;
  background-color: ${colors.offWhite};
  border-radius: 4px;
  border: 1px solid ${colors.primaryBlue};
  padding: ${metrics.defaultPadding};
  font-size: ${fonts.small};
  color: ${colors.black};

  ::placeholder {
    font-size: ${fonts.large};
    color: ${colors.blueGray};
  }

  @media (max-width: 1100px) {
    height: 60px;
    margin-bottom: 20px;
    font-size: ${fonts.regular};
  }

  @media (max-width: 768px) {
    height: 45px;
    font-size: ${fonts.regular};
  }

  @media (max-width: 480px) {
    height: 45px;
    font-size: ${fonts.regular};
  }

  ${(props) =>
    props.$size === "small" &&
    css`
      min-width: ${metrics.selectSmallWidth};
      max-width: ${metrics.selectSmallWidth};
    `}

  ${(props) =>
    props.$size === "large" &&
    css`
      min-width: ${metrics.selectLargeWidth};
      max-width: ${metrics.selectLargeWidth};
    `}

  ${(props) =>
    props.$size === "full" &&
    css`
      min-width: ${metrics.selectFullWidth};
      max-width: ${metrics.selectFullWidth};
    `}
`;

export const InputTitle = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  margin-bottom: ${metrics.smallPadding};
  @media (max-width: 1100px) {
    font-size: ${fonts.regular};
  }
`;
