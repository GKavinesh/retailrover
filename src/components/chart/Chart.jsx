import "./chart.scss";
import Image from "../images/ganesha food.png";
const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="welcome">
        <img src={Image} alt="Welcome" />
      </div>
    </div>
  );
};

export default Chart;


