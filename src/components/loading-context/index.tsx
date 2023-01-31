import React, {createContext, useState} from "react"

export type LoadingContextValueType = {
  setLoading: (param1: boolean) => void
}

const defaultValue: LoadingContextValueType = {
  setLoading: () => {
    console.log('dokuzuncu satırdaki setLoading çalıştı')
  }
}

export const LoadingContext = createContext(defaultValue)

export default function Loading(props: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const contextValue: LoadingContextValueType = {
    setLoading: (param1: boolean) => {
      console.log('yirminci satırdaki setLoading çalıştı')

      setIsLoading(param1)
    }
  }

  return <LoadingContext.Provider value={contextValue}>
    <div className={['loading', (isLoading ? 'active' : '')].join(' ')}>
      <img src={'assets/images/loading-1.gif'}/>
    </div>

    {props.children}

  </LoadingContext.Provider>

}


