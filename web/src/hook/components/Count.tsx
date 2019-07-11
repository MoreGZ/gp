import * as React from "react"
import { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Button } from 'antd'
import { useFriendStatus } from './hooks'

export default function App (prosp: any) {
    const [ count, setCount ] = useState(0)
    const id = 10002
    const {isOnline, handleStatusChange} = useFriendStatus(id)

    const handleClickButton = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        console.log('mount')
        document.title = `You clicked ${count} times`;
        return () => {
            document.title = ` You clicked 0 times`
            console.log('unmount')
        }
    })

    return (
        <>
            {count}<br/>
            {id}: { isOnline ? 'yes' : 'no' }
            <div>
                <Button onClick={handleClickButton} >plus count</Button>
                <Button onClick={() => {handleStatusChange(isOnline)}}>change status</Button>
            </div>
        </>
    );
}