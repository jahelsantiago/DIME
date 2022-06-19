import React, { useState } from 'react'

export default function FileSelector() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const InputFile = (
        <input type="file" name="file" onChange={changeHandler} />
    )

    return [InputFile, selectedFile, isFilePicked]
}
