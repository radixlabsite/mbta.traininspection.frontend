import styled, { css } from "styled-components";
import { metrics, fonts } from "@repo/themes";

interface ContainerProps {
  $width?: string;
  $height?: string;
}

export const InputTitle = styled.span`
  font-size: ${fonts.small};
  font-weight: bold;
  margin-bottom: ${metrics.smallPadding};
  @media (max-width: 1100px) {
    font-size: ${fonts.regular};
  }
`;

export const Content = styled.div<ContainerProps>`
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}

  ${(props) =>
    props.$height &&
    css`
      height: ${props.$height};
    `}
`;
