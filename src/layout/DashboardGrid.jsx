import GridLayout from "react-grid-layout";
import CryptoWidget from "../widgets/CryptoWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import NewsWidget from "../widgets/NewsWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DashboardGrid = () => {
    const layout = [
        { i: "crypto", x: 0, y: 0, w: 1, h: 2 },
        { i: "weather", x: 1, y: 0, w: 1, h: 2 },
        { i: "news", x: 2, y: 0, w: 1, h: 2 },
    ];

    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={3}
            rowHeight={150}
            width={1200}
            draggableHandle=".widget-header"
            isDraggable={true}
            isResizable={true}
            useCSSTransforms={true}
        >
            <div key="crypto"><CryptoWidget /></div>
            <div key="weather"><WeatherWidget /></div>
            <div key="news"><NewsWidget /></div>
        </GridLayout>
    );
};

export default DashboardGrid;
