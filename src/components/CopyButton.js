import { Button } from '@material-ui/core'
import React, { useState } from 'react'

export const CopyButton = ({text}) => {
    
    const [copyButton, setCopyButton] = useState({color : "cyan", text : "Copy"});

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopyButton({color:"gray", text: "Copied!"})
        setTimeout(()=>{
            setCopyButton({color : "cyan", text : "Copy"})
        }, 4000)
    }
    return (
        <Button
                color={copyButton.color}
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"                
                style = {{backgroundColor : copyButton.color}}
                onClick={handleCopy}
            >
                {copyButton.text}
        </Button>
    )
}
