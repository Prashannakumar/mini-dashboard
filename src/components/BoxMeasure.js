import React, { useLayoutEffect, useRef, useState } from "react";

function BoxMeasure() {
    const [width, setWidth] = useState(0);
    const boxRef = useRef();

    useLayoutEffect(() => {
        if (boxRef.current) {
            setWidth(boxRef.current.offsetWidth)
        }
    }, []);

    return (
        <div>
            <h2>Box Measurement</h2>

            <div ref={boxRef}
                style={{
                    width: "50%",
                    padding: "20px",
                    border: "2px solid blue",
                    marginBottom: "10px"
                }}
            >
                Resize the window and refresh
            </div>
            <p>Box width: {width}px</p>
        </div>
    )
}

export default BoxMeasure;