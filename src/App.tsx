import { useState, useEffect, useCallback } from 'react'

import './index.css'
import './rainbow-status.css'

import { Header } from './components/Header'
import { StatusDisplay, type InitStatus } from './components/Status'
import { ExitButton } from './components/Controls'
import { GameArea } from './components/GameArea'

import { PlaycademyClient } from '@playcademy/sdk'

// --- Main App Component ---

export function App() {
    const [initStatus, setInitStatus] = useState<InitStatus>('loading')
    const [client, setClient] = useState<PlaycademyClient | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isExitedStandalone, setIsExitedStandalone] = useState(false)

    const isStandalone = window.self === window.top

    // SDK Initialization Effect
    useEffect(() => {
        console.log('[App] Initializing Playcademy SDK...')
        PlaycademyClient.init()
            .then((sdkClient: PlaycademyClient) => {
                console.log('[App] Playcademy SDK Initialized:', sdkClient)
                setClient(sdkClient)
                setInitStatus('success')
            })
            .catch((err: unknown) => {
                console.error('[App] Failed to initialize Playcademy SDK:', err)
                setError(err instanceof Error ? err.message : String(err))
                setInitStatus('error')
            })
    }, [])

    // Exit Handler
    const handleExit = useCallback(() => {
        if (client && !isStandalone) {
            console.log('[App] Attempting to exit via client.runtime.exit()...')
            client.runtime.exit()
        } else {
            console.warn(
                '[App] Exit Game clicked in Standalone Mode. No actual exit occurs.',
            )
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
