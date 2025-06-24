import React from "react";
import { colors, metrics } from "@repo/themes";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoData,
  StatusContainer,
  StatusBackground,
  InfoStatus,
  TimeContainer,
  IconButtonContainer,
  InfoYardmaster,
  InfoBadge,
  InfoTrainNumber,
  LineLocationContainer,
  LineCircle,
  LocationText,
  InfoReasonMove,
  RowContainer,
  TrainNumbersContainer,
  TrainPairContainer,
  Badge,
} from "./styles";
import IconButton from "../IconButton";
import { MdOutlineSearch } from "react-icons/md";
import { IMove, ITag, User } from "@repo/models";
import { useStatus } from "@repo/ui/hooks";
import useFormattedDate from "../../hooks/useFormatDate";
import Tooltip from "../Tooltip";
import { FaTag } from "react-icons/fa6";

interface InspectionListItemProps {
  inspectionData: IMove;
  status: string;
  handleDetailsClick: (inspectionId: string) => void;
}

const InspectionListItem: React.FC<InspectionListItemProps> = ({
  inspectionData,
  status,
  handleDetailsClick,
}) => {
  const statusStyle = useStatus();
  const formatDate = useFormattedDate();
  const { background, color, text } = statusStyle.moveStatusStyles(status);
  const { color: lineColor, initials } = statusStyle.yardLineColor(
    inspectionData.yard?.line?.name ?? ""
  );

  const inspectionMotorperson: User = {
    name: inspectionData.inspections_done_by_user
      ? inspectionData.inspections_done_by_user?.name
      : "",
    badge_number: inspectionData.inspections_done_by_user
      ? `#${inspectionData.inspections_done_by_user.badge_number}`
      : "--",
  };

  const inspectionYardmaster: User = {
    name: inspectionData.yardmaster_user
      ? inspectionData.yardmaster_user.name
      : "",
    badge_number: inspectionData.yardmaster_user
      ? `#${inspectionData.yardmaster_user.badge_number}`
      : "--",
  };

  return (
    <Container>
      <TimeContainer>
        <InfoData>
          {formatDate.formatDateTime(inspectionData.created_at)}
        </InfoData>
      </TimeContainer>
      <InfoYardmaster>
        <InfoTitle>{inspectionYardmaster.badge_number}</InfoTitle>
        <InfoData>{inspectionYardmaster.name}</InfoData>
      </InfoYardmaster>
      <InfoBadge>
        <InfoTitle>{inspectionMotorperson.badge_number}</InfoTitle>
        <InfoData>{inspectionMotorperson.name}</InfoData>
      </InfoBadge>
      <LineLocationContainer>
        <RowContainer>
          <LineCircle color={lineColor}>{initials}</LineCircle>
          <LocationText>{inspectionData.yard?.name}</LocationText>
        </RowContainer>
      </LineLocationContainer>
      <InfoTrainNumber>
        <TrainNumbersContainer>
          <TrainPairContainer>
            <InfoTitle>First</InfoTitle>
            <InfoData>
              {`${inspectionData.move_cars?.[0]?.first_car.series_number}
                ${inspectionData.move_cars[0].second_car ? " - " : " "}
                ${
                  inspectionData.move_cars?.[0]?.second_car
                    ? inspectionData.move_cars?.[0]?.second_car.series_number
                    : ""
                }`}
            </InfoData>
          </TrainPairContainer>
          <TrainPairContainer>
            <InfoTitle>Second</InfoTitle>
            <InfoData>
              {`${
                inspectionData.move_cars?.[1]?.first_car?.series_number ?? ""
              } - ${
                inspectionData.move_cars?.[1]?.second_car?.series_number ?? ""
              }`}
            </InfoData>
          </TrainPairContainer>
          <TrainPairContainer>
            <InfoTitle>Third</InfoTitle>
            <InfoData>
              {`${
                inspectionData.move_cars?.[2]?.first_car?.series_number ?? ""
              } - ${
                inspectionData.move_cars?.[2]?.second_car?.series_number ?? ""
              }`}
            </InfoData>
          </TrainPairContainer>
        </TrainNumbersContainer>
      </InfoTrainNumber>
      <InfoReasonMove>
        <InfoData>{inspectionData.move_reason?.name}</InfoData>
      </InfoReasonMove>
      <InfoContainer>
        <InfoData>{inspectionData.move_from}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoData>{inspectionData.move_to}</InfoData>
      </InfoContainer>
      <InfoContainer>
        <InfoData>{inspectionData.priority_order}</InfoData>
      </InfoContainer>
      <StatusContainer>
        <StatusBackground background={background}>
          <InfoStatus color={color}>{text}</InfoStatus>
        </StatusBackground>
      </StatusContainer>
      <InfoContainer>
        <Tooltip
          text={inspectionData.tags.map((e: ITag) => e.name).join(",")}
          position="left"
        >
          <RowContainer>
            <FaTag size={metrics.iconRegular} color={colors.darkBlue} />
            <Badge>{inspectionData.tags.length}</Badge>
          </RowContainer>
        </Tooltip>
      </InfoContainer>
      <IconButtonContainer>
        <IconButton
          onClick={() => handleDetailsClick(inspectionData.id)}
          primary
          icon={<MdOutlineSearch color={colors.primaryBlue} size={20} />}
        />
      </IconButtonContainer>
    </Container>
  );
};

export default InspectionListItem;
