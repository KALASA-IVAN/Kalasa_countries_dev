'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider as StoreProvider } from 'react-redux'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from '@/src/store/redux'

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <StoreProvider store={store}>
            <AntdRegistry>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <Toaster
                        toastOptions={{
                            success: {
                                style: {
                                    background: '#536DFE',
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat',
                                    fontSize: '.82em',
                                },
                            },
                            error: {
                                style: {
                                    background: '#C83532',
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat',
                                    fontSize: '.82em',
                                },
                            },
                            position: 'bottom-center',
                        }}
                    />
                </QueryClientProvider>
            </AntdRegistry>
        </StoreProvider>
    )
}