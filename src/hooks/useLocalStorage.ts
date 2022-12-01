import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, intialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonVal = localStorage.getItem(key);

        if (jsonVal == null) {
            if (typeof intialValue == "function") {
                return (intialValue as Function)()
            }
        } else {
            return JSON.parse(jsonVal)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])


    return [value, setValue] as [T, typeof setValue]
}
