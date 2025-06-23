import styled, { css } from "styled-components";
import { colors, metrics, fonts } from "@repo/themes";

interface SelectProps {
  $isMobile?: boolean;
}

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div<SelectProps>`
  background-color: ${colors.white};
  width: 59%;
  padding: 20px;
  border-radius: ${metrics.borderRadius};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: 70%; /* When it reaches 80% of the screen height, activate the scroll */
  overflow-y: auto;

  ${(props) =>
    !props.$isMobile &&
    css`
      height: fit-content;
    `}

  ${(props) =>
    props.$isMobile &&
    css`
      max-width: 60%;
    `}

  @media (max-width: 768px) {
    max-height: 88%;
    margin-top: 50px;
  }
`;

export const TitleView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${metrics.smallPadding};
`;

export const ButtonView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftButtonContainer = styled.div`
  display: flex;
`;

export const RightButtonContainer = styled.div`
  display: flex;
  gap: ${metrics.defaultPadding};
`;

export const ComboBoxContainer = styled.div<SelectProps>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px
    ${(props) =>
      props.$isMobile &&
      css`
        flex-wrap: wrap;
      `};
`;

export const SmallComboBox = styled.div`
  width: 120px;
  height: 100px;
  margin-right: 10px;
`;

export const LargeComboBox = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  width: 290px;
  height: 100px;
  margin-right: 20px;

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}

  @media (max-width: 768px) {
    height: 5em;
  }
`;

export const LargeSelectInput = styled.div<SelectProps>`
  width: 50%;
  height: 100px;

  ${(props) =>
    props.$isMobile &&
    css`
      width: 100%;
    `}

  @media (max-width: 768px) {
    height: 5em;
  }
`;

export const TrainView = styled.div<SelectProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputView = styled.div<SelectProps>`
  width: 120px;
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

export const ModalTitle = styled.span`
  font-size: ${fonts.large};
  font-weight: 500;
  color: ${colors.black};
`;

export const CloseBtnContainer = styled.div`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;
