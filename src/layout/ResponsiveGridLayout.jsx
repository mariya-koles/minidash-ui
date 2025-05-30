import { useState, useCallback, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import CryptoWidget from "../widgets/CryptoWidget";
import WeatherWidget from "../widgets/WeatherWidget";
import NewsWidget from "../widgets/NewsWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const ResponsiveGridLayoutComponent = () => {
    // Initial layouts for different breakpoints - sizing based on content needs
    const [layouts, setLayouts] = useState({
        lg: [
            { i: "crypto", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
            { i: "weather", x: 3, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
            { i: "news", x: 7, y: 0, w: 6, h: 2, minW: 2, minH: 2 }
        ],
        md: [
            { i: "crypto", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
            { i: "weather", x: 3, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
            { i: "news", x: 7, y: 0, w: 6, h: 2, minW: 2, minH: 2 }
        ],
        sm: [
            { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "weather", x: 2, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
            { i: "news", x: 0, y: 2, w: 8, h: 2, minW: 2, minH: 2 }
        ],
        xs: [
            { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "weather", x: 2, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "news", x: 0, y: 2, w: 6, h: 2, minW: 2, minH: 2 }
        ],
        xxs: [
            { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "weather", x: 0, y: 2, w: 2, h: 2, minW: 2, minH: 2 },
            { i: "news", x: 0, y: 4, w: 2, h: 2, minW: 2, minH: 2 }
        ]
    });

    // Handle layout changes (drag, resize, etc.)
    const onLayoutChange = useCallback((layout, allLayouts) => {
        setLayouts(allLayouts);
        // Optional: Save to localStorage for persistence
        localStorage.setItem('dashboardLayouts', JSON.stringify(allLayouts));
    }, []);

    // Load saved layouts from localStorage on component mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('dashboardLayouts');
            if (saved) {
                const parsedLayouts = JSON.parse(saved);
                setLayouts(parsedLayouts);
            }
        } catch (error) {
            console.error('Failed to load saved layouts:', error);
        }
    }, []);

    // Function to reset layouts (for debugging)
    const resetLayouts = () => {
        localStorage.removeItem('dashboardLayouts');
        setLayouts({
            lg: [
                { i: "crypto", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
                { i: "weather", x: 3, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
                { i: "news", x: 7, y: 0, w: 6, h: 2, minW: 2, minH: 2 }
            ],
            md: [
                { i: "crypto", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
                { i: "weather", x: 3, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
                { i: "news", x: 7, y: 0, w: 6, h: 2, minW: 2, minH: 2 }
            ],
            sm: [
                { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
                { i: "weather", x: 2, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
                { i: "news", x: 0, y: 2, w: 8, h: 2, minW: 2, minH: 2 }
            ],
            xs: [
                { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
                { i: "weather", x: 2, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
                { i: "news", x: 0, y: 2, w: 6, h: 2, minW: 2, minH: 2 }
            ],
            xxs: [
                { i: "crypto", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
                { i: "weather", x: 0, y: 2, w: 2, h: 2, minW: 2, minH: 2 },
                { i: "news", x: 0, y: 4, w: 2, h: 2, minW: 2, minH: 2 }
            ]
        });
    };

    return (
        <div className="grid-container">
            {/* Reset button */}
            <button 
                onClick={resetLayouts}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                    padding: '5px 10px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Reset Layout
            </button>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                onLayoutChange={onLayoutChange}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 16, md: 16, sm: 8, xs: 6, xxs: 2 }}
                rowHeight={120}
                isDraggable={true}
                isResizable={true}
                preventCollision={false}
                compactType={null}
                margin={[16, 16]}
                containerPadding={[16, 16]}
                draggableHandle=".widget-header"
                resizeHandles={['se']}
                useCSSTransforms={true}
                autoSize={true}
            >
                <div key="crypto">
                    <CryptoWidget />
                </div>
                <div key="weather">
                    <WeatherWidget />
                </div>
                <div key="news">
                    <NewsWidget />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default ResponsiveGridLayoutComponent;
