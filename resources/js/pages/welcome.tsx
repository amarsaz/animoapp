import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div
                className="min-h-screen bg-cover bg-center bg-no-repeat relative"
                style={{
                    backgroundImage: 'url(https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQyc6-qhd7a3TIpYulc68jPDqJmWiNAc5b1rHySe11Uj7zZPpVUoO0kFQH1_jKWT1el9Qmh0CaNkrH3NqjDz9PQmwqFGhtf-VZixsq6Nvc)'
                }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Header */}
                <header className="relative z-10 px-6 py-8 lg:px-12 lg:py-10">
                    <nav className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/paws.png" alt="Animo" className="h-10 w-10 lg:h-12 lg:w-12 object-contain border-2 border-white rounded-md" />
                            <span className="text-2xl lg:text-3xl font-bold text-white">Animo</span>
                        </div>
                        <div className="flex items-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-white font-medium hover:text-white/80 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-white font-medium hover:text-white/80 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 border border-white/30 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex items-center justify-center px-6 py-12 lg:py-24">
                    <div className="max-w-3xl text-center">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                            We track endangered species with powerful digital precision
                        </h1>
                        <p className="text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                            We have created an innovative platform that helps conservationists,
                            researchers and wildlife organizations monitor endangered species
                            efficiently and accurately. Our dashboard visualizes tracking data in
                            real-time.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
