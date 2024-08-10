import githubWe from '../assets/github-we.jpg'

export default function About() {
    return (
        <div>
            <div className="w-full h-full bg-gray-900 dark:bg-slate-50 text-gray-50 dark:text-gray-800">
                <div className="max-w-7xl mx-auto  mb-20 flex flex-col items-center justify-start ">
                    <div className="md:text-6xl text-3xl mt-24 mb-5 font-bold  mx-10 md:mt-48 md:mb-3">About Me</div>
                </div>
            </div>
            <div className="max-w-3xl mx-auto my-0">
                <img src={githubWe} alt="" className='' />
            </div>
            <div className="m-10 flex flex-col gap-5 max-w-4xl mx-auto">
                <div className="">
                    Veerapol Charanai has experience in software development using React, Node.js ,Next JS experience in writing, developing, and
                    improving websites
                </div>
                <div className="">
                    de.js, and also possesses experience in writing, developing, and
                    improving websites, including the ability to perform various designs from his time
                    working in design. With a fast typing skill and a diverse range of work experiences,
                    from being a designer to a sales employee, he has developed excellent
                    communication and teamwork skills
                </div>
                <div className="">
                    skills to develop and create high-quality work in the position of a programmer
                </div>
            </div>
        </div>
    )
}