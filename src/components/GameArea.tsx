import { useEffect } from 'react'
import type { PlaycademyClient } from '@playcademy/sdk'

interface GameAreaProps {
    client: PlaycademyClient
}

export function GameArea({ client }: GameAreaProps) {
    useEffect(() => {
        async function fetchUserData() {
            // TODO: Address the behavior of client.users.me() (and similar SDK calls) in standalone/mock mode.
            // Currently, these calls attempt to reach /api/users/me (etc.), and the Vite dev server responds
            // with index.html because no actual backend is running at that path.
            // This results in the '.then(data => ...)' callback receiving HTML instead of expected API data.
            // For a better local development experience, implement a robust mocking strategy.
            // See: https://github.com/superbuilders/playcademy/issues/19
            const userData = await client.users.me()
            console.log('[GameArea] User data fetched:', userData)
        }
        fetchUserData()
    }, [client])

    return <div>{/* TODO: Add game area content here */}</div>
}
