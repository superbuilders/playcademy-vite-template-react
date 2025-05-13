import { useState, useEffect, useCallback } from 'react'

import './index.css'
import './rainbow-status.css'

import { setupPlaycademy } from './playcademy'

import { Header } from './components/Header'
import { StatusDisplay, type InitStatus } from './components/Status'
import { ExitButton } from './components/Controls'
import { GameArea } from './components/GameArea'

import type { PlaycademyClient } from '@playcademy/sdk'

// --- Main App Component ---

export function App() {
    const [initStatus, setInitStatus] = useState<InitStatus>('loading')
    const [client, setClient] = useState<PlaycademyClient | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isExitedStandalone, setIsExitedStandalone] = useState(false)

    const isDevelopment = window.self === window.top

    // SDK Initialization Effect
    useEffect(() => {
        console.log('[App] Initializing Playcademy SDK...')
        setupPlaycademy()
            .then(sdkClient => {
                console.log('[App] Playcademy SDK Initialized:', sdkClient)
                setClient(sdkClient)
                setInitStatus('success')
            })
            .catch(err => {
                console.error('[App] Failed to initialize Playcademy SDK:', err)
                setError(err instanceof Error ? err.message : String(err))
                setInitStatus('error')
            })
    }, [])

    // Exit Handler
    const handleExit = useCallback(() => {
        if (client && !isDevelopment) {
            console.log('[App] Attempting to exit via client.runtime.exit()...')
            client.runtime.exit()
        } else {
            console.warn(
                '[App] Exit Game clicked in Development Mode. No actual exit occurs.',
            )
            setIsExitedStandalone(true)
        }
    }, [client, isDevelopment])

    return (
        <>
            <Header />
            <StatusDisplay
                status={initStatus}
                error={error}
                isExitedStandalone={isExitedStandalone}
                isDevelopment={isDevelopment}
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
