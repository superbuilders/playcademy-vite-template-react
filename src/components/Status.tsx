export type InitStatus = 'idle' | 'loading' | 'success' | 'error'

export interface StatusDisplayProps {
    status: InitStatus
    error: string | null
    isExitedStandalone: boolean
    isDevelopment: boolean
}

export function StatusDisplay({
    status,
    error,
    isExitedStandalone,
    isDevelopment,
}: StatusDisplayProps) {
    const getStatusText = () => {
        if (status === 'loading') {
            return 'Initializing Playcademy SDK...'
        }
        if (status === 'error') {
            return `Error initializing Cademy: ${error}`
        }
        if (status === 'success') {
            if (isExitedStandalone) {
                return 'Exited [Development Mode]'
            }
            return `Playcademy SDK Initialized!${isDevelopment ? ' [Development Mode]' : ''}`
        }
        return 'Idle' // Should not happen
    }

    const statusClassName =
        `status-text ${status === 'error' ? 'error' : ''} ${isExitedStandalone ? 'exited' : ''}`.trim()

    return (
        <div className="status-container">
            <p className={statusClassName}>{getStatusText()}</p>
        </div>
    )
}
