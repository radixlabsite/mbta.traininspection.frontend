import styled, { css } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

interface SelectProps {
  $size?: string;
}

interface ContainerProps {
  $width?: string;
}

export const DataListInput = styled.input<SelectProps>`
  display: flex;
  width: ${metrics.fullscreen};
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
    height: 45px;
    margin-bottom: 20px;
    font-size: ${fonts.regular};
  }

  @media (max-width: 768px) {
    height: 2em;
    font-size: ${fonts.regular};
  }

  @media (max-width: 480px) {
    height: 2em;
    font-size: ${fonts.regular};
  }

  ${(props) =>
    props.$size === "small" &&
    css`
      width: 70px;
    `}

  ${(props) =>
    props.$size === "medium" &&
    css`
      min-width: 180px;
      max-width: 180px;
    `}

    ${(props) =>
    props.$size === "medium2" &&
    css`
      width: 280px;
    `}
  

  ${(props) =>
    props.$size === "large" &&
    css`
      min-width: ${metrics.selectLargeWidth};
      max-width: ${metrics.selectLargeWidth};
    `}

      ${(props) =>
    props.$size === "large2" &&
    css`
      width: 510px;
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

export const Content = styled.div<ContainerProps>`
  width: 150px;

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}
`;
