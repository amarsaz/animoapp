import { Head } from '@inertiajs/react';
import { SignupForm } from "@/components/signup-form"

export default function Register() {
    return (
        <>
            <Head title="Register" />
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
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
