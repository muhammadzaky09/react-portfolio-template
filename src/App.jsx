import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaGithub,
  FaStar,
  FaUserAlt,
  FaLinkedinIn,
  FaBehance,
  FaComments,
  FaDribbble,
  FaUserFriends,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [user, setUser] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const githubUsername = "muhammadzaky09";

  const fetchData = async () => {
    const userResponse = await fetch(
      `https://api.github.com/users/${githubUsername}`
    );
    const userData = await userResponse.json();
    setUser(userData);

    const repoResponse = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    const repoData = await repoResponse.json();
    const sortedRepos = repoData
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    setUserRepo(sortedRepos);
  };

  useEffect(() => {
    fetchData();
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div
      className="App text-white"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <div className="py-4 m-auto max-w-4xl">
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl text-[#e2ebf8] font-medium font-['Fonarto']">
            <span className="text-[#05BFDB]">Muhammad </span>Zaky
          </h1>
          <div className="flex gap-x-3">
            <a href="https://medium.com/@muhammad.zaky.firdaus">
              <button className="w-32 h-10 rounded-md text-sm text-[#fff] transition duration-300 hover:text-[#05BFDB]  font-semibold ">
                Medium
              </button>
            </a>
            <a href="mailto:muhammad.zaky.firdaus@mail.ugm.ac.id">
              <button className="w-32 h-10 rounded-md text-sm border-2 border-[#05BFDB] text-[#05BFDB] bg-transparent transition duration-300 hover:text-[#fff] hover:bg-[#05BFDB] font-semibold">
                Contact me
              </button>
            </a>
          </div>
        </nav>
        <main className="py-36">
          <div className="flex flex-row gap-x-5">
            <div className="flex-none w-40 h-40">
              <img
                src={user.avatar_url}
                className="w-40 h-40 rounded-full border-4 backdrop-blur-md transition duration-300 border-[#182b42]/30"
                alt="Profile"
              />
              <span className="flex font-semibold items-center justify-center mt-2">
                <FaUserFriends className="text-[#05BFDB] mr-2" />
                {user.followers} followers
              </span>
            </div>
            <div className="flex-col">
              <div>
                <h1 className="text-3xl text-[#ffffff] font-medium font-['Fonarto']">
                  Hi, I’m {user.name} 👋
                </h1>
              </div>

              <p className="text-lg font-medium">
                I'm a computer science student and aspiring software developer based in Indonesia.
                
              </p>
              <p className="text-lg font-medium">
                Passionate about building software that solves real-world problems utilising MERN Stack, React Native, Flutter.
              </p>
             
              <div className="flex py-8 font-bold">
                <a href="https://github.com/3r4y">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300 rounded-full text-base bg-[#10151a] text-[#fff] hover:text-[#10151a] hover:bg-[#fff] m-2 p-2">
                    <FaGithub /> GitHub
                  </button>
                </a>
                <a href="https://www.linkedin.com/in/muhammadzakyf/">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300 rounded-full text-base bg-[#0072b1] text-[#fff]  hover:text-[#0072b1] hover:bg-[#fff] m-2 p-2">
                    <FaLinkedinIn />
                    LinkedIn
                  </button>
                </a>
                <a href="https://drive.google.com/file/d/1lV_XNSvZnernr3Y31h5UBrrMT09wW0tE/view?usp=sharing">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300 rounded-full text-base bg-[#030303] text-[#fff]  hover:text-[#030303] hover:bg-[#fff] m-2 p-2">
                    CV
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-white font-semibold mt-9">
              Featured Projects 🤗
            </h1>
            <p className="fp-paragraph">
              A collection of some side projects that have shipped recently.
            </p>
            <ul className="py-6 flex flex-col items-center justify-center">
              {userRepo.map((repo) => (
                <div
                  className="rounded-lg mt-2 max-h-md px-6 py-6 w-full backdrop-blur-md transition duration-300 bg-[#182b42]/30 hover:bg-[#182b42]/80"
                  key={repo.id}
                >
                  <a
                    href={repo.html_url}
                    className="relative block overflow-hidden rounded-lg p-4 sm:p-4 lg:py-px"
                    key={repo.id}
                  >
                    <div className="sm:flex sm:justify-between sm:gap-2 ">
                      <div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">
                          {repo.name.replaceAll("-", " ")}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-400">
                          By {repo.owner.login}
                        </p>
                      </div>
                      <div className="hidden sm:block sm:shrink-0">
                        <img
                          src={repo.owner.avatar_url}
                          className="h-16 w-16 rounded-lg object-cover shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="max-w-[90ch] font-semibold text-sm text-gray-200">
                        {repo.description}
                      </p>
                    </div>
                    <dl className="mt-6 flex gap-4 sm:gap-6">
                      <div className="flex flex-col">
                        <dt className="text-sm font-semibold text-gray-400 flex items-center">
                          <FaStar className="mr-1 text-[#ffffff]" />
                          {repo.stargazers_count} Stars
                        </dt>
                        <dd className="text-sm mt-2 text-gray-400 font-semibold flex justify-center items-center">
                          <FaComments className="mr-1 text-[#ffffff]" />
                          {repo.open_issues_count} Issues
                        </dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-sm font-semibold text-gray-400 flex items-center">
                          <FaUserAlt className="mr-1 text-[#ffffff]" />
                          {repo.forks_count} Forks
                        </dt>
                      </div>
                    </dl>
                    {repo.language && (
                      <div className="absolute bottom-0 right-0 text-sm mt-2 px-4 text-white font-semibold p-1 bg-[#05BFDB]/20 border border-[#05BFDB] rounded-xl flex justify-center items-center">
                        {repo.language}
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
