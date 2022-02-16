import React, { useState } from 'react'

const style = {
    "backgroundColor": "#002f53",
    "color": "white",
    "padding": "0.5rem",
    "border-radius": "5px",
}

export const CopyButton = ({text}) => {
    
    const [copyButton, setCopyButton] = useState({color : "antiquewhite", text : "Copy"});

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopyButton({color:"gray", text: "Copied!"})
        setTimeout(()=>{
            setCopyButton({color : "antiquewhite", text : "Copy"})
        }, 4000)
    }
    return (
        <button style = {style} onClick={handleCopy}>
                {copyButton.text}
        </button>
    )
}
