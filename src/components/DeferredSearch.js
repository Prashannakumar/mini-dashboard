import React, { useDeferredValue, useState } from "react";

const bigList = Array.from({ length: 500 }, (_, i) => `Item ${i + 1}`);

function DeferredSearch() {

    // -------example 1: simple filter with deferred value ---------

    // const [query, setQuery] = useState("");
    // const deferredQuery = useDeferredValue(query);

    // const filtered = bigList.filter((item) =>
    //     item.toLowerCase().includes(deferredQuery.toLowerCase())
    // );
    // // console.log(bigList)
    // return (
    //     <div>
    //         <h2>Deferred Search</h2>
    //         <input
    //             type="search"
    //             placeholder="Type to filter..."
    //             value={query}
    //             onChange={(e) => setQuery(e.target.value)}
    //         />
    //         <ul style={{ maxHeight: "200px", overflow: "scroll" }}>
    //             {filtered.map((item) => (
    //                 <li key={item}>
    //                     {item}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // )

    // -------example 2: simulate expensive rendering with deferred value ---------

    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query); // lagged version

    // Simulate expensive list rendering
    const list = Array(500).fill(null).map((_, i) => (
        <div key={i}>{deferredQuery}</div>
    ));

    return (
        <div>
            <h2>Deferred Search</h2>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type here..."
            />
            <div>{list}</div>
        </div>
    );
}

export default DeferredSearch;