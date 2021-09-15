import { useState } from "react";

function useArray(){
    const [array, setarray] = useState([])

    function push(elem){
        setarray(prev => [...prev, elem])
    }

    function remove(index){
        setarray(prev => prev.filter((elem, idx) => idx !== index))
    }

    function edit(index, elem){
        setarray(prev => [...prev.slice(0,index), elem, ...prev.slice(index + 1, prev.length)])
    }

    return [array, push, remove, edit]
}

export default useArray