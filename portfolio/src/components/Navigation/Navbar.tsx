import Link from "next/link";
import { FaGithubSquare } from "react-icons/fa";


const Navbar = () => {

    return (
        <header className="flex">
            <h3 className="inline text-2xl">Piyush Sontakke</h3>
            <div className="inline-flex w-full justify-between items-center">
                <nav>
                    <Link href="#">Resume</Link>
                    <Link href="#">Skills</Link>
                    <Link href="#">Projects</Link>
                    <Link href="#">Certificates</Link>
                </nav>
                <div className="flex">
                    <Link href="/aboutMe">Contact Me </Link>
                    <Link href="https://github.com/pushsontakke"><FaGithubSquare/></Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar;