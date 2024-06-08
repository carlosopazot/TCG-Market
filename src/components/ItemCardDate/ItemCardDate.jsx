import { Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ItemCardDate = ({ item, size }) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = item.date?.toDate()?.toLocaleString(undefined, options);
  
  const currentDate = new Date();
  const itemDate = item.date?.toDate();

  const isSameDay = currentDate.toLocaleDateString() === itemDate?.toLocaleDateString();

  const isYesterday = (() => {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toLocaleDateString() === itemDate?.toLocaleDateString();
  })();

  const isWithinWeek = (() => {
    const weekAgo = new Date(currentDate);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return itemDate > weekAgo && !isSameDay && !isYesterday;
  })();

  const isWithinMonth = (() => {
    const monthAgo = new Date(currentDate);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return itemDate > monthAgo && !isSameDay && !isYesterday && !isWithinWeek;
  })();

  const textSize = size || 12;
  const textStyles = { fontSize: textSize };

  let displayText;
  if (isSameDay) {
    displayText = 'Hoy';
  } else if (isYesterday) {
    displayText = 'Ayer';
  } else if (isWithinWeek) {
    displayText = 'Esta semana';
  } else if (isWithinMonth) {
    displayText = 'Este mes';
  } else {
    displayText = formattedDate;
  }

  return (
    <Text style={textStyles} type="secondary">
      <ClockCircleOutlined /> {displayText}
    </Text>
  );
};

export default ItemCardDate;
