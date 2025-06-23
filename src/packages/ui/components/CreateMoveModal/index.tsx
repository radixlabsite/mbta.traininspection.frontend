import React, { useEffect, useState } from "react";
import MainButton from "../MainButton";
import InputBox from "../InputBox";
import Select from "../Select";
import messages from "@repo/constants/messages";
import {
  ICar,
  ICreateMove,
  IYardPerson,
  IMoveReason,
  SelectOption,
  ITag,
} from "@repo/models";
import {
  ModalContainer,
  ModalContent,
  ComboBoxContainer,
  LargeComboBox,
  ButtonView,
  LargeSelectInput,
  LeftButtonContainer,
  RightButtonContainer,
  TrainView,
} from "./styles";
import ModalHeader from "../ModalHeader";
import InputSelect from "../InputSelect";
import InputMultiSelect from "../InputMultiSelect";
import Toast from "../Toast";
import { useFormatString } from "@repo/ui/hooks";
import TrainPairSection from "../TrainPairSection";

interface IHasId {
  id: string;
}

interface CreateMoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  moveReasons: IMoveReason[];
  yardMotorpersons: IYardPerson[];
  moveOrder: string[];
  cars: ICar[];
  yardId: string;
  sendFn: (data: ICreateMove[]) => Promise<void>;
  selectedLine?: any;
  isMobile?: boolean;
  setInfoModalVisibility?: () => void;
}

interface ISelectOption {
  reasonMove: string;
  yardMotorperson: string;
  tags: ITag[];
  items: ISelectOptionItem[];
}
interface ISelectOptionItem {
  from: string;
  to: string;
  moveOrder: string;
  firstPair1: "";
  firstPair2: "";
  secondPair1: "";
  secondPair2: "";
  thirdPair1: "";
  thirdPair2: "";
}

const CreateMoveModal: React.FC<CreateMoveModalProps> = ({
  isOpen,
  onClose,
  moveReasons,
  yardMotorpersons,
  moveOrder,
  cars,
  yardId,
  sendFn,
  selectedLine,
  isMobile = false,
  setInfoModalVisibility,
}) => {
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const formatString = useFormatString();
  const [availableTags, setAvailableTags] = useState<SelectOption<ITag>[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ISelectOption>({
    reasonMove: "",
    yardMotorperson: "",
    tags: [],
    items: [
      {
        from: "",
        to: "",
        moveOrder: "",
        firstPair1: "",
        firstPair2: "",
        secondPair1: "",
        secondPair2: "",
        thirdPair1: "",
        thirdPair2: "",
      },
    ],
  });

  const addNewTrain = () => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      items: [
        ...prevOptions.items,
        {
          from: "",
          to: "",
          moveOrder: (prevOptions.items.length + 1).toString(),
          firstPair1: "",
          firstPair2: "",
          secondPair1: "",
          secondPair2: "",
          thirdPair1: "",
          thirdPair2: "",
        },
      ],
    }));
  };

  const resetSelectedOptions = () => {
    setSelectedOptions({
      reasonMove: "",
      yardMotorperson: "",
      tags: [],
      items: [
        {
          from: "",
          to: "",
          moveOrder: "1",
          firstPair1: "",
          firstPair2: "",
          secondPair1: "",
          secondPair2: "",
          thirdPair1: "",
          thirdPair2: "",
        },
      ],
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetSelectedOptions();
    }
  }, [isOpen]);

  const removeTrain = (index: number) => {
    setSelectedOptions((prevOptions) => {
      const newItems = [...prevOptions.items];

      newItems.splice(index, 1);

      return {
        ...prevOptions,
        items: newItems,
      };
    });
  };

  useEffect(() => {
    if (selectedOptions.reasonMove) {
      const selectedMoveReason = moveReasons.find(
        (reason) => reason.id === selectedOptions.reasonMove
      );

      setSelectedOptions((prev) => ({
        ...prev,
        tags: [],
      }));

      const newTags: SelectOption<ITag>[] = selectedMoveReason
        ? selectedMoveReason.tags.map((tag: any) => ({
            value: tag,
            label: tag.name,
          }))
        : [];

      setAvailableTags(newTags);
    }
  }, [selectedOptions.reasonMove, moveReasons]);

  const formatOptions = (): ICreateMove[] => {
    return selectedOptions.items.map((item, index) => {
      return {
        due_date: new Date().toString(),
        move_cars: [
          {
            first_car_id:
              cars.find((car: ICar) => car.series_number === item.firstPair1)
                ?.id ?? "",
            pair_order: 1,
            second_car_id:
              cars.find((car: ICar) => car.series_number === item.firstPair2)
                ?.id ?? "",
          },
          {
            first_car_id:
              cars.find((car: ICar) => car.series_number === item.secondPair1)
                ?.id ?? "",
            pair_order: 2,
            second_car_id:
              cars.find((car: ICar) => car.series_number === item.secondPair2)
                ?.id ?? "",
          },
          {
            first_car_id:
              cars.find((car: ICar) => car.series_number === item.thirdPair1)
                ?.id ?? "",
            pair_order: 3,
            second_car_id:
              cars.find((car: ICar) => car.series_number === item.thirdPair2)
                ?.id ?? "",
          },
        ].filter(moveCars => moveCars.first_car_id.length && moveCars.second_car_id.length),
        move_from: item.from,
        move_reason_id: selectedOptions.reasonMove,
        move_to: item.to,
        priority_order: Number(item.moveOrder),
        yard_id: yardId,
        yardmaster_user_id: selectedOptions.yardMotorperson,
        tag_ids: selectedOptions.tags.map((tag) => tag.id).filter(Boolean),
      };
    });
  };
  if (!isOpen) return null;
  return (
    <ModalContainer>
      <ModalContent $isMobile={isMobile}>
        <ModalHeader title={messages.CreateMove.title} onClose={onClose} />
        <ComboBoxContainer $isMobile={isMobile}>
          <LargeComboBox $isMobile={isMobile}>
            <Select
              inputTitle={messages.CreateMove.reason}
              options={moveReasons.map((e) => ({
                value: { id: e.id },
                label: e.name,
              }))}
              size="full"
              onChange={(value) => {
                setSelectedOptions((prev) => ({
                  ...prev,
                  reasonMove: value.id,
                }));
              }}
              value={selectedOptions.reasonMove}
              showHelper
              onOpenModal={setInfoModalVisibility}
            />
          </LargeComboBox>
          {!isMobile && (
            <LargeComboBox>
              <InputSelect
                inputTitle={messages.CreateMove.motorperson}
                value={selectedOptions.yardMotorperson}
                options={yardMotorpersons.map((e) => ({
                  value: { id: e.id ?? "" },
                  label: e.name,
                }))}
                size="full"
                width={isMobile ? "85%" : "90%"}
                onChange={(value) => {
                  setSelectedOptions((prev) => ({
                    ...prev,
                    yardMotorperson: value.toString(),
                  }));
                }}
              />
            </LargeComboBox>
          )}
          <LargeSelectInput $isMobile={isMobile}>
            <InputMultiSelect
              inputTitle={messages.CreateMove.tags}
              value={selectedOptions.tags.map((tag) => ({
                value: tag,
                label: tag.name,
              }))}
              options={availableTags}
              onChange={(value) => {
                setSelectedOptions((prev) => ({
                  ...prev,
                  tags: value,
                }));
              }}
              width="100%"
              height="20px"
            />
          </LargeSelectInput>
        </ComboBoxContainer>
        <ComboBoxContainer $isMobile={isMobile}>
          <TrainView>
            {selectedOptions.items.map((item, index) => {
              const selectedCars: string[] = [
                item.firstPair1,
                item.firstPair2,
                item.secondPair1,
                item.secondPair2,
                item.thirdPair1,
                item.thirdPair2,
              ].filter(
                (val: string) => typeof val === "string" && val.trim() !== ""
              );

              const filteredCarsSelectData: SelectOption<ICar>[] = cars
                .filter((car) => !selectedCars.includes(car.series_number))
                .map((car) => ({
                  value: car,
                  label: car.series_number,
                }));

              return (
                <TrainPairSection
                  key={index}
                  index={index}
                  carsSelectData={filteredCarsSelectData}
                  item={item}
                  handleCarChange={(name, value) => {
                    const updatedItems = [...selectedOptions.items];
                    updatedItems[index] = {
                      ...updatedItems[index],
                      [name]: value,
                    };
                    setSelectedOptions({
                      ...selectedOptions,
                      items: updatedItems,
                    });
                  }}
                  handleChangeTextInput={(name, value) => {
                    const updatedItems = [...selectedOptions.items];
                    updatedItems[index] = {
                      ...updatedItems[index],
                      [name]: value,
                    };
                    setSelectedOptions({
                      ...selectedOptions,
                      items: updatedItems,
                    });
                  }}
                  handleMoveOrderChange={(value) => {
                    const updatedItems = [...selectedOptions.items];
                    updatedItems[index] = {
                      ...updatedItems[index],
                      moveOrder: value,
                    };
                    setSelectedOptions({
                      ...selectedOptions,
                      items: updatedItems,
                    });
                  }}
                  isMobile={isMobile}
                  onRemove={
                    selectedOptions.items.length > 1
                      ? () => removeTrain(index)
                      : undefined
                  }
                />
              );
            })}
          </TrainView>
        </ComboBoxContainer>
        <ButtonView>
          <LeftButtonContainer>
            <MainButton
              onClick={addNewTrain}
              text={messages.Labels.addTrain}
              primary={false}
              size="small"
            />
          </LeftButtonContainer>
          <RightButtonContainer>
            <MainButton
              onClick={onClose}
              text={messages.Labels.cancel}
              primary={false}
              size="small"
            />
            <MainButton
              onClick={() => {
                const formattedData = formatOptions();
                sendFn(formattedData);
              }}
              text={messages.Labels.createMove}
              size="medium"
            />
          </RightButtonContainer>
        </ButtonView>
      </ModalContent>
      <Toast
        message={toastMessage}
        visible={showErrorToast}
        setVisible={setShowErrorToast}
      />
    </ModalContainer>
  );
};

export default CreateMoveModal;
