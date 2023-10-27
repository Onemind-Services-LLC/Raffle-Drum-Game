import React, { createContext, useState } from 'react';
const ArrayContext = createContext();

const ArrayProvider = ({ children }) => {
    const [array, setArray] = useState([]);

    return (
        <ArrayContext.Provider value={{ array, setArray }}>
            {children}
        </ArrayContext.Provider>
    );
};

export { ArrayContext, ArrayProvider };
