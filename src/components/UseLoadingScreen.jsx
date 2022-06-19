import React from 'react'
import "./useLoadingScreen.css"

export default function UseLoadingScreen() {
    const [isLoading, setIsLoading] = React.useState(false);
    function toggleLoading(newState) {
        setIsLoading(newState);
    }
    
    let ScreenCompoenent =  isLoading && (
        <div className='loading_container'>
            <div className='loading_screen'>
                <div className='loading_text'>
                    <h1>Subiendo...</h1>
                </div>
            </div>
        </div>
    )


    return [ScreenCompoenent, toggleLoading]


}
