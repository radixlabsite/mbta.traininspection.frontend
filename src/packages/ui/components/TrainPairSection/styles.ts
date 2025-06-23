import styled, { css } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

interface SelectProps {
  $isMobile?: boolean;
}

export const PairViewComboBox = styled.div<SelectProps>`
  display: flex;
  width: 190px;
  height: 100px;

  ${(props) =>
    !props.$isMobile &&
    css`
      margin-right: 20px;
    `}

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}

  @media (max-width: 768px) {
    height: 5em;
  }
`;

export const ViewPair = styled.div<{ title?: string; $isMobile?: boolean }>`
  width: 100px;
  ${({ title }) =>
    title === "false" &&
    `
    margin-top: 19px;
  `}

  ${(props) =>
    props.$isMobile &&
    css`
      width: 50%;
    `}
`;

export const InputView = styled.div<SelectProps>`
  width: 20%;
  margin-right: 25px;

  ${(props) =>
    !props.$isMobile &&
    css`
      height: 50px;
    `}

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}
`;

export const DeleteView = styled.div<SelectProps>`
  margin-top: 20px;
  margin-left: -5px;
`;

export const OrderView = styled.div<SelectProps>`
  width: 35px;
  margin-right: 30px;
`;
