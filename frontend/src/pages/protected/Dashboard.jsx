import React, { useEffect, useState } from "react";
import axios from "axios";
import Chatroom from "../Chatroom";
import { Helmet } from "react-helmet-async";
axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [searching, setSearching] = useState(false);
  const [searchFriend, setSearchFriend] = useState("");
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState("");

  const openChatroom = (fiendId) => {
    setSelected(fiendId);
    setSearching(false);
  };

  useEffect(() => {
    const searchPeople = async () => {
      if (!searchFriend.trim()) {
        setPeople([]);
        setSearching(false);
        return;
      }

      try {
        setSearching(true);
        const response = await axios.get(
          `http://localhost:3001/api/v2/user/search-people/?query=${searchFriend}`
        );
        setPeople(response.data.people || []);
      } catch (error) {
        console.log(error);
      } finally {
        setSearching(false);
      }
    };

    // Delay search function to optimize (500ms debounce)
    const timeoutId = setTimeout(() => {
      if (searchFriend) searchPeople();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchFriend]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-background text-white pt-20 overflow-hidden">
      <Helmet>
        <title>Dashboard | Joro Chat App</title>
        <meta name="description" content="Access your Joro dashboard, search for friends, and start resonating." />
      </Helmet>
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-black/10 backdrop-blur-2xl">
        <div className="p-8 space-y-6">
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchFriend}
              onChange={(e) => setSearchFriend(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-[2rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-white/10 text-sm font-bold uppercase tracking-widest"
            />
            {searching && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {searchFriend && !searching && (
            <button
              onClick={() => setSearchFriend("")}
              className="w-full py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-blue-400 transition-colors"
            >
              Close Results
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-12 custom-scrollbar">
          {searchFriend ? (
            <div className="space-y-2">
              <p className="px-4 text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-6">Discovery</p>
              {people.length > 0 ? (
                people.map((person) => (
                  <button
                    key={person._id}
                    onClick={() => openChatroom(person._id)}
                    className={`w-full flex items-center gap-5 p-4 rounded-[2rem] transition-all duration-500 group ${selected === person._id ? 'bg-blue-600 shadow-2xl shadow-blue-600/20' : 'hover:bg-white/5'
                      }`}
                  >
                    <div className="avatar-instagram">
                      <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center font-black text-white shadow-inner group-hover:scale-105 transition-transform duration-500 text-lg uppercase">
                        {person.username[0]}
                      </div>
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-black text-sm tracking-tight text-white mb-1 truncate">{person.username}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest leading-none ${selected === person._id ? 'text-white/70' : 'text-white/20'}`}>Active Now</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-white/10 text-xs font-black uppercase tracking-[0.4em]">No resonances found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-10">
              <div className="text-8xl grayscale">🌟</div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Your Echo Awaits</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col min-w-0 bg-transparent">
        {selected ? (
          <Chatroom friendId={selected} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative mb-10 transform hover:rotate-6 transition-transform duration-1000">
              <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full"></div>
              <div className="relative w-24 h-24 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center text-4xl shadow-xl backdrop-blur-2xl">
                🌊
              </div>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">Start the Flow</h3>
            <p className="text-white/20 max-w-[280px] mx-auto font-semibold uppercase tracking-widest text-[10px] leading-relaxed">
              Every connection begins with a simple search. Find your circle and start echoing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
