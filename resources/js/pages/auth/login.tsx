import { Head } from '@inertiajs/react';
import { LoginForm } from "@/components/login-form"

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <>
            <Head title="Log in" />
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="relative hidden bg-muted lg:block">
                    <img
                        src="https://www.aljazeera.com/wp-content/uploads/2022/03/2021-05-01T043409Z_1849838145_RC2S6N9O3QRA_RTRMADP_3_MALAYSIA-TIGER-BIRTHDAY.jpg?resize=1800%2C1800"
                        alt="Malayan Tiger"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="/" className="flex items-center gap-2 font-medium">
                            <img src="/paws.png" alt="Animo" className="h-8 w-8 object-contain border-2 border-white rounded-md" />
                            Animo
                        </a>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            <LoginForm canResetPassword={canResetPassword} />
                            {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
