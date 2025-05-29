import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);
import CryptoWidget from "../widgets/CryptoWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import NewsWidget from "../widgets/NewsWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DashboardGrid = () => {
    return (
        <div style={{ width: "100%", margin: "0 auto" }}>
            <ResponsiveGridLayout
                className="layout"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 }}
                rowHeight={150}
                isDraggable={true}
                isResizable={true}
                draggableHandle=".widget-header"
            >
                <div key="crypto"><CryptoWidget /></div>
                <div key="weather"><WeatherWidget /></div>
                <div key="news"><NewsWidget /></div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default DashboardGrid;
