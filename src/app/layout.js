import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import StoreProvider from '@/redux/StoreProvider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
    title: 'Evocommerce store',
    description: 'Test task',
};

export default function RootLayout({ children }) {
    return (
        <html lang="uk">
        <body className={inter.className}>
        <StoreProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    {children}
                </main>
            </div>
        </StoreProvider>
        </body>
        </html>
    );
}
