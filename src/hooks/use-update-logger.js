import { useEffect  } from "react"

const useUpdateLogger = (value, label='noname') => {
    useEffect(() => {
        console.log(label + ' updated to ')
        console.log(value)
    }, [value, label])
}

export default useUpdateLogger