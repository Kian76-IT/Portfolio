export default function Footer () {
    return(
        <footer className="border-t border-white/10 px-6 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-zin-500 sm:flex-row sm:items-center sm:justify-between">
                <p>
                    © {new Date().getFullYear()} Kian Aurelio Wibowo.
                </p>

                <p>
                Built with Next.js &amp; Tailwind CSS.
                </p>
            </div>


        </footer>
    );
} 