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
    <div className="flex flex-col md:flex-row w-full h-screen bg-black text-white pt-16 overflow-hidden selection:bg-blue-500 selection:text-white">
      <Helmet>
        <title>Echo • Dashboard</title>
        <meta name="description" content="Access your Echo dashboard and start connecting." />
      </Helmet>

      {/* Subtle Ambient Backlight */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#1a1a1a] flex flex-col bg-black/40 backdrop-blur-xl z-10">
        <div className="p-6 space-y-4">
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="SEARCH PEOPLE..."
              value={searchFriend}
              onChange={(e) => setSearchFriend(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl focus:outline-none focus:border-blue-500/50 transition-all placeholder-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase"
            />
            {searching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {searchFriend && !searching && (
            <button
              onClick={() => setSearchFriend("")}
              className="w-full py-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
            >
              Clear Results
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
          {searchFriend ? (
            <div className="space-y-1">
              <p className="px-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Discovery</p>
              {people.length > 0 ? (
                people.map((person) => (
                  <button
                    key={person._id}
                    onClick={() => openChatroom(person._id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group ${selected === person._id ? 'bg-[#1a1a1a] border border-[#333]' : 'hover:bg-[#0a0a0a] border border-transparent'
                      }`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform text-sm uppercase">
                        {person.username[0]}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-bold text-sm tracking-tight text-white truncate">{person.username}</p>
                      <p className={`text-[9px] font-bold uppercase tracking-widest leading-none ${selected === person._id ? 'text-blue-400' : 'text-gray-500'}`}>
                        {selected === person._id ? 'Active Session' : 'Connect'}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">No results found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
              <div className="w-12 h-12 rounded-2xl border border-gray-800 flex items-center justify-center text-xl grayscale">
                ✨
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-center">Your Echo Awaits</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col min-w-0 bg-transparent z-10">
        {selected ? (
          <Chatroom friendId={selected} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 relative">
            <div className="max-w-md space-y-6 relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-[2.5rem] mb-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                <span className="text-4xl">🌊</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                Start the Flow
              </h3>
              <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
                Connect with the people you care about. Find your circle and start echoing across the network.
              </p>
              <div className="pt-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#111] border border-[#222] text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Select a contact to begin
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

