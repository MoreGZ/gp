import * as React from "react"
import { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Button } from 'antd'
import Count from './components/Count'
import { useFriendStatus } from './components/hooks'

export default function App (prosp: any) {
    const id = 10001
    const {isOnline, handleStatusChange} = useFriendStatus(id)

    return (
        <>  
            <div>
                {id}: { isOnline ? 'yes' : 'no' }
                <Button onClick={() => {handleStatusChange(isOnline)}}>change status</Button>
            </div>
            <Count />
        </>
    );
}