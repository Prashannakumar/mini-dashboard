import React, { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div style={{ margin: "20px 0" }}>
            <h2>Clock</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    )
}

export default Clock;