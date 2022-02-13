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

    
    function swap(indexA, indexB){
        const newArray = [...array]
        const itemA = newArray[indexA]
        const itemB = newArray[indexB]
        newArray[indexA] = itemB
        newArray[indexB] = itemA
        setarray(newArray)
    }

    function down(index){
        if(index === array.length - 1){        
            return
        }
        swap(index, index + 1)        
    }

    function up(index){
        if(index === 0){
            return
        }
        swap(index, index - 1)
        
    }

    return [array, push, remove, edit, up, down]
}

export default useArray