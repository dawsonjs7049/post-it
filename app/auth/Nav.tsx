import Link from "next/link"
import Login from "./Login"
import Logged from "./Logged";
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../pages/api/auth/[...nextauth]';

// This is a server component (async)

// We will render a client component inside it to deal with conditional (if user is logged in or not already)

export default async function Nav() {

    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={"/"}>
                <h1 className="font-bold text-lg">Send</h1>
            </Link>
            <ul className="flex items-center gap-6">
                {
                    !session?.user ?
                    (
                        <Login />
                    )
                    :
                    (
                        <Logged image={session.user?.image || ""} />
                    )  
                }
            </ul>
        </nav>
    )
}