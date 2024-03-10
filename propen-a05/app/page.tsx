export default function Page() {
    return (
        <div className="py-10 px-10">
            <div className="flex justify-between items-center text-2xl font-bold mb-5">
                <h1>Welcome Back, Please </h1>
                <div className="flex pa-2">
                    <a href="/api/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}
