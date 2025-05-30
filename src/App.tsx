import { useCallback, useEffect, useState } from 'react'

import './index.css'
import './rainbow-status.css'

import { PlaycademyClient } from '@playcademy/sdk'

import { ExitButton } from './components/Controls'
import { GameArea } from './components/GameArea'
import { Header } from './components/Header'
import { StatusDisplay } from './components/Status'

import type { InitStatus } from './components/Status'

// Helper logger (disabled by default)
const devLog = (..._args: unknown[]) => {
    // Toggle to `true` while debugging this template
    const ENABLE_LOGS = false
    if (ENABLE_LOGS) {
        console.log(..._args)
    }
}

// --- Main App Component ---

export function App() {
    const [initStatus, setInitStatus] = useState<InitStatus>('loading')
    const [client, setClient] = useState<PlaycademyClient | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isExitedStandalone, setIsExitedStandalone] = useState(false)

    const isStandalone = window.self === window.top

    // SDK Initialization Effect
    useEffect(() => {
        devLog('[App] Initializing Playcademy SDK...')
        PlaycademyClient.init()
            .then((sdkClient: PlaycademyClient) => {
                devLog('[App] Playcademy SDK Initialized:', sdkClient)
                setClient(sdkClient)
                setInitStatus('success')
            })
            .catch((err: unknown) => {
                devLog('[App] Failed to initialize Playcademy SDK:', err)
                setError(err instanceof Error ? err.message : String(err))
                setInitStatus('error')
            })
    }, [])

    // Exit Handler
    const handleExit = useCallback(() => {
        if (client && !isStandalone) {
            devLog('[App] Attempting to exit via client.runtime.exit()...')
            client.runtime.exit()
        } else {
            devLog('[App] Exit Game clicked in Standalone Mode. No actual exit occurs.')
            setIsExitedStandalone(true)
        }
    }, [client, isStandalone])

    return (
        <>
            <Header />
            <StatusDisplay
                status={initStatus}
                error={error}
                isExitedStandalone={isExitedStandalone}
                isStandalone={isStandalone}
            />
            <ExitButton
                status={initStatus}
                isExitedStandalone={isExitedStandalone}
                onClick={handleExit}
                disabled={!client}
            />

            {initStatus === 'success' && client && <GameArea client={client} />}
        </>
    )
}
